from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from app.database.db import get_db
from app.models.gallery import GalleryItem
from app.core.auth import get_current_user
from app.core.cloudinary import upload_image, delete_file

router = APIRouter()


class GalleryItemOut(BaseModel):
    id: int
    title: str
    category: str
    image_url: str
    thumb_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ─── PUBLIC ────────────────────────────────────────────────────────────────

@router.get("/", response_model=List[GalleryItemOut])
def get_gallery(db: Session = Depends(get_db)):
    """Get all gallery items (public)."""
    return db.query(GalleryItem).order_by(GalleryItem.created_at.desc()).all()


@router.get("/{item_id}", response_model=GalleryItemOut)
def get_gallery_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


# ─── ADMIN (protected) ────────────────────────────────────────────────────

@router.post("/", response_model=GalleryItemOut)
async def create_gallery_item(
    title: str = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    """Upload a new gallery image (admin only)."""
    contents = await file.read()
    result = upload_image(contents, file.filename or "image", "gallery")

    item = GalleryItem(
        title=title,
        category=category,
        image_url=result["url"],
        thumb_url=result["url"],
        width=result.get("width"),
        height=result.get("height"),
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=GalleryItemOut)
async def update_gallery_item(
    item_id: int,
    title: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    """Update a gallery item (admin only)."""
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    if title:
        item.title = title
    if category:
        item.category = category
    if file:
        contents = await file.read()
        result = upload_image(contents, file.filename or "image", "gallery")
        item.image_url = result["url"]
        item.thumb_url = result["url"]

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_gallery_item(
    item_id: int,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    """Delete a gallery item (admin only)."""
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Deleted successfully"}
