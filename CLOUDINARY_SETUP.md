# Cloudinary Setup Guide

## Why Cloudinary?
- ✅ 25GB free storage + 25GB bandwidth/month
- ✅ Automatic CDN (global delivery)
- ✅ Image optimization (auto WebP, lazy load)
- ✅ Video transcoding
- ✅ On-the-fly transformations (resize, crop, format)

---

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up (free account)
3. After signup, go to Dashboard → copy these 3 values:
   - **Cloud Name**: e.g. `dxxxxxxxxxxxx`
   - **API Key**: e.g. `123456789012345`
   - **API Secret**: e.g. `abcdefghijklmnopqrstuvwxyz`

---

## Step 2: Upload Your Existing Files

### Option A: Use Cloudinary Web UI (easiest)
1. Go to Media Library
2. Click "Upload"
3. Drag all files from `MY PICTURES/` and `MY VIDEOS/`
4. Organize into folders:
   - `yvonne-hospitality/gallery/`
   - `yvonne-hospitality/portfolio/`
   - `yvonne-hospitality/videos/`
   - `yvonne-hospitality/testimonials/`

### Option B: Use Upload Script (automated)
Run the `scripts/upload-to-cloudinary.js` script (see below)

---

## Step 3: Add Environment Variables

Add to `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=yvonne-hospitality
```

Add to `frontend/.env`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CDN_BASE_URL=https://res.cloudinary.com/your_cloud_name/image/upload
```

---

## Step 4: Update Database

Run the migration script to create tables (see `backend/migrations/001_create_media_tables.sql`)

---

## Step 5: Update Frontend Code

Instead of hardcoded paths like:
```js
image: "/images/gallery/food1.jpg"
```

Fetch from API:
```js
const { data } = await galleryApi.getAll();
// data = [{ id: 1, title: "...", image_url: "https://res.cloudinary.com/..." }]
```

---

## CDN URLs Examples

After upload, your files will be served from:

```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/yvonne-hospitality/gallery/food1.jpg
```

**With transformations** (auto-optimized):
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/w_400,h_300,c_fill,f_auto,q_auto/yvonne-hospitality/gallery/food1.jpg
```

- `w_400,h_300` = resize to 400x300
- `c_fill` = crop to fill
- `f_auto` = auto format (WebP for browsers that support it)
- `q_auto` = auto quality (smaller file size)

---

## Benefits You'll Get

1. **Faster Load Times**: Images served from nearest CDN edge location
2. **Smaller Files**: Auto WebP conversion (60% smaller than JPEG)
3. **Lazy Loading**: Built-in support
4. **Responsive Images**: Generate thumbnails on-the-fly
5. **Video Streaming**: Adaptive bitrate streaming for videos

---

## Cost Estimate

Current usage:
- Images: ~5MB total
- Videos: ~9MB total
- **Total: ~14MB** (well within 25GB free tier)

Expected monthly bandwidth (1000 visitors):
- ~14GB (still within 25GB free tier)

**Verdict: You won't pay anything for years**
