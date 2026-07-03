from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from app.database.db import get_db
from app.models.service import Service
from app.core.auth import get_current_user
from app.core.cloudinary import upload_image

router = APIRouter()


class ServiceOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    image_url: str
    badge: Optional[str] = None
    sort_order: int

    class Config:
        from_attributes = True


@router.get("/", response_model=List[ServiceOut])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).order_by(Service.sort_order).all()


@router.post("/", response_model=ServiceOut)
async def create_service(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    badge: Optional[str] = Form(None),
    sort_order: int = Form(0),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    contents = await file.read()
    result = upload_image(contents, file.filename or "image", "services")

    item = Service(
        title=title,
        description=description,
        image_url=result["url"],
        badge=badge,
        sort_order=sort_order,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=ServiceOut)
async def update_service(
    item_id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    badge: Optional[str] = Form(None),
    sort_order: Optional[int] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = db.query(Service).filter(Service.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")

    if title:
        item.title = title
    if description is not None:
        item.description = description
    if badge is not None:
        item.badge = badge
    if sort_order is not None:
        item.sort_order = sort_order
    if file:
        contents = await file.read()
        result = upload_image(contents, file.filename or "image", "services")
        item.image_url = result["url"]

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_service(
    item_id: int,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = db.query(Service).filter(Service.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(item)
    db.commit()
    return {"message": "Deleted"}
