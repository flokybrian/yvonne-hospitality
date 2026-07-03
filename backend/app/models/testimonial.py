from sqlalchemy import Column, Integer, DateTime, Text, Boolean
from sqlalchemy.sql import func
from app.database.db import Base

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, nullable=False)  # 1-5
    review = Column(Text, nullable=False)
    featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
