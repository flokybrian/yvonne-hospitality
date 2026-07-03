from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime

from app.database.db import get_db
from app.models.newsletter import NewsletterSubscriber
from app.core.auth import get_current_user

router = APIRouter()


class SubscribeRequest(BaseModel):
    email: str


class SubscriberOut(BaseModel):
    id: int
    email: str
    subscribed: bool
    created_at: datetime

    class Config:
        from_attributes = True


@router.post("/subscribe")
def subscribe(data: SubscribeRequest, db: Session = Depends(get_db)):
    """Subscribe to newsletter (public)."""
    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == data.email
    ).first()
    if existing:
        if not existing.subscribed:
            existing.subscribed = True
            db.commit()
        return {"message": "Subscribed successfully"}

    subscriber = NewsletterSubscriber(email=data.email)
    db.add(subscriber)
    db.commit()
    return {"message": "Subscribed successfully"}


@router.get("/", response_model=List[SubscriberOut])
def list_subscribers(db: Session = Depends(get_db), _user=Depends(get_current_user)):
    """List all subscribers (admin only)."""
    return db.query(NewsletterSubscriber).order_by(
        NewsletterSubscriber.created_at.desc()
    ).all()
