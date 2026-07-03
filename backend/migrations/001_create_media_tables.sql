-- ============================================================
-- Migration 001: Create media tables
-- All files stored in Cloudinary CDN.
-- DB stores URLs only, not files.
-- ============================================================

-- Gallery items
CREATE TABLE IF NOT EXISTS gallery_items (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    category    VARCHAR(100) NOT NULL,
    image_url   TEXT NOT NULL,          -- Full Cloudinary CDN URL
    thumb_url   TEXT,                   -- Thumbnail variant URL
    width       INTEGER,
    height      INTEGER,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

-- Portfolio items
CREATE TABLE IF NOT EXISTS portfolio_items (
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    category     VARCHAR(100) NOT NULL,
    description  TEXT,
    image_url    TEXT NOT NULL,         -- Full Cloudinary CDN URL
    thumb_url    TEXT,
    created_at   TIMESTAMP DEFAULT NOW(),
    updated_at   TIMESTAMP DEFAULT NOW()
);

-- Videos
CREATE TABLE IF NOT EXISTS videos (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,
    description   TEXT,
    video_url     TEXT NOT NULL,        -- Full Cloudinary CDN URL (mp4)
    thumb_url     TEXT,                 -- Auto-generated video thumbnail
    duration      INTEGER,              -- Duration in seconds
    file_size     BIGINT,               -- Original file size in bytes
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    image_url   TEXT NOT NULL,          -- Full Cloudinary CDN URL
    badge       VARCHAR(50),
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id          SERIAL PRIMARY KEY,
    rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review      TEXT NOT NULL,
    featured    BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Contacts (form submissions)
CREATE TABLE IF NOT EXISTS contacts (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    phone       VARCHAR(50),
    message     TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    subscribed  BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT NOW()
);
