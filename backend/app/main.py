from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.core.config import settings
from app.core.cloudinary import init_cloudinary
from app.api.v1 import gallery, videos, portfolio, testimonials, services, contact, newsletter
from app.api.v1.auth import router as auth_router

# Initialize app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Cloudinary
init_cloudinary()

# Mount uploads directory
uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
if os.path.exists(uploads_dir):
    app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# API routes
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(gallery.router, prefix="/api/v1/gallery", tags=["Gallery"])
app.include_router(videos.router, prefix="/api/v1/videos", tags=["Videos"])
app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["Portfolio"])
app.include_router(testimonials.router, prefix="/api/v1/testimonials", tags=["Testimonials"])
app.include_router(services.router, prefix="/api/v1/services", tags=["Services"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["Contact"])
app.include_router(newsletter.router, prefix="/api/v1/newsletter", tags=["Newsletter"])

@app.get("/")
def root():
    return {"message": "Yvonne Hospitality API", "version": settings.APP_VERSION}

@app.get("/health")
def health():
    return {"status": "healthy"}
