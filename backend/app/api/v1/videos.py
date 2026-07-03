from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from app.database.db import get_db
from app.models.video import Video
from app.core.auth import get_current_user
from app.core.cloudinary import upload_video

router = APIRouter()


class VideoOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    video_url: str
    thumb_url: Optional[str] = None
    duration: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ─── PUBLIC ────────────────────────────────────────────────────────────────

@router.get("/", response_model=List[VideoOut])
def get_videos(db: Session = Depends(get_db)):
    return db.query(Video).order_by(Video.created_at.desc()).all()


@router.get("/{video_id}", response_model=VideoOut)
def get_video(video_id: int, db: Session = Depends(get_db)):
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video


# ─── ADMIN (protected) ────────────────────────────────────────────────────

@router.post("/", response_model=VideoOut)
async def create_video(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    """Upload a new video (admin only)."""
    contents = await file.read()
    result = upload_video(contents, file.filename or "video")

    video = Video(
        title=title,
        description=description,
        video_url=result["url"],
        thumb_url=result.get("thumbnail_url"),
        duration=result.get("duration"),
        file_size=result.get("size"),
    )
    db.add(video)
    db.commit()
    db.refresh(video)
    return video


@router.put("/{video_id}", response_model=VideoOut)
async def update_video(
    video_id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")

    if title:
        video.title = title
    if description is not None:
        video.description = description
    if file:
        contents = await file.read()
        result = upload_video(contents, file.filename or "video")
        video.video_url = result["url"]
        video.thumb_url = result.get("thumbnail_url")

    db.commit()
    db.refresh(video)
    return video


@router.delete("/{video_id}")
def delete_video(
    video_id: int,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    db.delete(video)
    db.commit()
    return {"message": "Deleted successfully"}
