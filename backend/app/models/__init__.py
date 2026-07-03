# Models will be imported here for Alembic auto-detection
from app.models.gallery import GalleryItem
from app.models.video import Video
from app.models.portfolio import PortfolioItem
from app.models.testimonial import Testimonial
from app.models.service import Service
from app.models.contact import Contact
from app.models.newsletter import NewsletterSubscriber
from app.models.admin_user import AdminUser

__all__ = [
    "GalleryItem",
    "Video",
    "PortfolioItem",
    "Testimonial",
    "Service",
    "Contact",
    "NewsletterSubscriber",
    "AdminUser",
]
