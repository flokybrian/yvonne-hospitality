from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from app.database.db import get_db
from app.models.portfolio import PortfolioItem
from app.core.auth import get_current_user
from app.core.cloudinary import upload_image

router = APIRouter()


class PortfolioItemOut(BaseModel):
    id: int
    title: str
    category: str
    description: Optional[str] = None
    image_url: str
    created_at: datetime

    class Config:
        from_attributes = True


@router.get("/", response_model=List[PortfolioItemOut])
def get_portfolio(db: Session = Depends(get_db)):
    return db.query(PortfolioItem).order_by(PortfolioItem.created_at.desc()).all()


@router.get("/{item_id}", response_model=PortfolioItemOut)
def get_portfolio_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.post("/", response_model=PortfolioItemOut)
async def create_portfolio_item(
    title: str = Form(...),
    category: str = Form(...),
    description: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    contents = await file.read()
    result = upload_image(contents, file.filename or "image", "portfolio")

    item = PortfolioItem(
        title=title,
        category=category,
        description=description,
        image_url=result["url"],
        thumb_url=result["url"],
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=PortfolioItemOut)
async def update_portfolio_item(
    item_id: int,
    title: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    if title:
        item.title = title
    if category:
        item.category = category
    if description is not None:
        item.description = description
    if file:
        contents = await file.read()
        result = upload_image(contents, file.filename or "image", "portfolio")
        item.image_url = result["url"]

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_portfolio_item(
    item_id: int,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Deleted successfully"}
