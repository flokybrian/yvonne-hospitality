"""
Cloudinary configuration + helper utilities.

ALL files (images, videos) are stored in Cloudinary.
The database stores ONLY the CDN URL — never the binary file.
"""

import cloudinary
import cloudinary.uploader
import cloudinary.api
from app.core.config import settings


def init_cloudinary() -> None:
    """Call once at app startup."""
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,          # Always HTTPS / CDN
    )


# ─────────────────────────────────────────────────────────────────────────────
# URL builder helpers
# ─────────────────────────────────────────────────────────────────────────────

def build_image_url(public_id: str, **transforms) -> str:
    """
    Build an optimised Cloudinary image URL.
    Defaults: auto format (WebP), auto quality, crop=fill.

    Example:
        build_image_url("yvonne-hospitality/gallery/food1",
                        width=800, height=600)
    """
    from cloudinary.utils import cloudinary_url

    defaults = dict(
        format="auto",   # serve WebP to modern browsers automatically
        quality="auto",  # let Cloudinary pick the best quality/size balance
        fetch_format="auto",
    )
    defaults.update(transforms)
    url, _ = cloudinary_url(public_id, **defaults)
    return url


def build_video_url(public_id: str, **transforms) -> str:
    """Build an optimised Cloudinary video URL."""
    from cloudinary.utils import cloudinary_url

    defaults = dict(resource_type="video", format="mp4")
    defaults.update(transforms)
    url, _ = cloudinary_url(public_id, **defaults)
    return url


def build_video_thumbnail(public_id: str, width: int = 640, height: int = 360) -> str:
    """Auto-generate a video thumbnail at the 1-second mark."""
    return build_image_url(
        public_id,
        resource_type="video",
        width=width,
        height=height,
        crop="fill",
        start_offset="1",
    )


# ─────────────────────────────────────────────────────────────────────────────
# Upload helpers
# ─────────────────────────────────────────────────────────────────────────────

def upload_image(file_bytes: bytes, filename: str, subfolder: str) -> dict:
    """
    Upload raw image bytes to Cloudinary.
    Returns: { url, public_id, width, height, format, bytes }
    """
    import io

    folder = f"{settings.CLOUDINARY_FOLDER}/{subfolder}"
    result = cloudinary.uploader.upload(
        io.BytesIO(file_bytes),
        folder=folder,
        public_id=filename,
        overwrite=True,
        resource_type="image",
        quality="auto:good",
        fetch_format="auto",
    )
    return {
        "url": result["secure_url"],
        "public_id": result["public_id"],
        "width": result.get("width"),
        "height": result.get("height"),
        "format": result.get("format"),
        "size": result.get("bytes"),
    }


def upload_video(file_bytes: bytes, filename: str) -> dict:
    """
    Upload raw video bytes to Cloudinary.
    Returns: { url, thumbnail_url, public_id, duration, bytes }
    """
    import io

    folder = f"{settings.CLOUDINARY_FOLDER}/videos"
    result = cloudinary.uploader.upload(
        io.BytesIO(file_bytes),
        folder=folder,
        public_id=filename,
        overwrite=True,
        resource_type="video",
    )

    public_id = result["public_id"]
    thumbnail_url = build_video_thumbnail(public_id)

    return {
        "url": result["secure_url"],
        "thumbnail_url": thumbnail_url,
        "public_id": public_id,
        "duration": result.get("duration"),
        "size": result.get("bytes"),
    }


def delete_file(public_id: str, resource_type: str = "image") -> bool:
    """Delete a file from Cloudinary by public_id."""
    result = cloudinary.uploader.destroy(public_id, resource_type=resource_type)
    return result.get("result") == "ok"
