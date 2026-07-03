from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel, Field
from datetime import datetime

from app.database.db import get_db
from app.models.testimonial import Testimonial
from app.core.auth import get_current_user

router = APIRouter()


class TestimonialOut(BaseModel):
    id: int
    rating: int
    review: str
    featured: bool
    created_at: datetime

    class Config:
        from_attributes = True


class TestimonialCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    review: str = Field(..., min_length=10)
    featured: bool = False


@router.get("/", response_model=List[TestimonialOut])
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()


@router.post("/", response_model=TestimonialOut)
def create_testimonial(
    data: TestimonialCreate,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = Testimonial(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=TestimonialOut)
def update_testimonial(
    item_id: int,
    data: TestimonialCreate,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = db.query(Testimonial).filter(Testimonial.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump().items():
        setattr(item, k, v)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_testimonial(
    item_id: int,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = db.query(Testimonial).filter(Testimonial.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(item)
    db.commit()
    return {"message": "Deleted"}
