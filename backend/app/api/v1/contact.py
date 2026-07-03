from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel, EmailStr
from datetime import datetime

from app.database.db import get_db
from app.models.contact import Contact
from app.core.auth import get_current_user

router = APIRouter()


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None
    message: str


class ContactOut(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None = None
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


@router.post("/", response_model=ContactOut)
def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    """Submit contact form (public)."""
    contact = Contact(**data.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact


@router.get("/", response_model=List[ContactOut])
def list_contacts(db: Session = Depends(get_db), _user=Depends(get_current_user)):
    """List all contact submissions (admin only)."""
    return db.query(Contact).order_by(Contact.created_at.desc()).all()


@router.delete("/{contact_id}")
def delete_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    item = db.query(Contact).filter(Contact.id == contact_id).first()
    if item:
        db.delete(item)
        db.commit()
    return {"message": "Deleted"}
