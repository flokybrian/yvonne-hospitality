from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.db import get_db
from app.models.admin_user import AdminUser
from app.core.auth import verify_password, create_access_token, get_password_hash

router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    """Login and get JWT access token."""
    user = db.query(AdminUser).filter(
        AdminUser.username == data.username,
        AdminUser.is_active == True
    ).first()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    token = create_access_token(data={"sub": user.username})
    return TokenResponse(access_token=token, username=user.username)


@router.post("/seed-admin")
def seed_admin(db: Session = Depends(get_db)):
    """
    Create the initial admin user (run ONCE then disable in production).
    Username: admin
    Password: admin123  ← CHANGE THIS in .env or after first login
    """
    existing = db.query(AdminUser).filter(AdminUser.username == "admin").first()
    if existing:
        return {"message": "Admin user already exists"}

    admin = AdminUser(
        username="admin",
        email="agani.mugasia24@s.karu.ac.ke",
        hashed_password=get_password_hash("admin123"),
        is_active=True
    )
    db.add(admin)
    db.commit()
    return {"message": "Admin user created. Username: admin | Password: admin123 — Change immediately!"}
