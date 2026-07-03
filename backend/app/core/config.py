from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────
    APP_NAME: str = "Yvonne Hospitality API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # ── Security ─────────────────────────────────────────
    SECRET_KEY: str = "your-secret-key-change-in-production-min-32-chars"
    
    # ── Database ─────────────────────────────────────────
    DATABASE_URL: str = "sqlite:///./yvonne.db"  # override in .env

    # ── Cloudinary ───────────────────────────────────────
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    CLOUDINARY_FOLDER: str = "yvonne-hospitality"

    # ── CORS ─────────────────────────────────────────────
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://yvonne-hospitality.onrender.com",
        "https://admin-yvonne.onrender.com",
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
