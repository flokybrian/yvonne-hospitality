# Admin Dashboard Plan

## 🎯 Goal
Create a separate admin panel where you can:
- ✅ Add/edit/delete gallery images
- ✅ Add/edit/delete videos
- ✅ Add/edit/delete portfolio items
- ✅ Add/edit/delete testimonials
- ✅ Edit services descriptions
- ✅ Upload images/videos via drag-drop
- ✅ All changes appear on the public site instantly (no code changes needed)

---

## 📐 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                            │
│  https://yvonne-hospitality.onrender.com                     │
│  - No login required                                         │
│  - Fetches content from API                                  │
│  - Read-only                                                 │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 │  GET /api/gallery
                 │  GET /api/videos
                 │  GET /api/portfolio
                 │
                 ↓
┌──────────────────────────────────────────────────────────────┐
│                   BACKEND API                                │
│  https://yvonne-api.onrender.com                             │
│  - FastAPI + PostgreSQL                                      │
│  - Public endpoints (no auth): GET /api/*                    │
│  - Admin endpoints (auth required): POST, PUT, DELETE        │
└────────────────┬─────────────────────────────────────────────┘
                 ↑
                 │  POST /api/auth/login
                 │  POST /api/gallery (+ JWT token)
                 │  DELETE /api/videos/:id (+ JWT token)
                 │
┌────────────────┴─────────────────────────────────────────────┐
│                   ADMIN DASHBOARD                            │
│  https://admin-yvonne.onrender.com                           │
│  - Login page (username + password)                          │
│  - After login: dashboard with CRUD interfaces               │
│  - Upload images/videos                                      │
│  - Protected by JWT authentication                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
1. Admin visits: https://admin-yvonne.onrender.com
2. Login form appears
3. Enter credentials:
   - Username: yvonne@admin
   - Password: [your secure password]
4. Backend validates → returns JWT token
5. Dashboard stores token in memory (not localStorage for security)
6. All API requests include token in Authorization header
7. Token expires after 24 hours (re-login required)
```

---

## 🎨 Admin Dashboard Pages

### 1. **Login Page** (`/admin/login`)
```
┌─────────────────────────────────────┐
│   Yvonne Hospitality Admin          │
│                                     │
│   Username: [___________________]   │
│   Password: [___________________]   │
│                                     │
│          [  Login  ]                │
└─────────────────────────────────────┘
```

### 2. **Dashboard Home** (`/admin`)
```
┌─────────────────────────────────────────────────────┐
│  Welcome back, Yvonne               [Logout]        │
├─────────────────────────────────────────────────────┤
│  Quick Stats:                                       │
│  📸 12 Gallery Items  🎬 3 Videos  💼 8 Portfolio  │
├─────────────────────────────────────────────────────┤
│  [Manage Gallery]  [Manage Videos]                 │
│  [Manage Portfolio]  [Manage Testimonials]         │
└─────────────────────────────────────────────────────┘
```

### 3. **Gallery Manager** (`/admin/gallery`)
```
┌─────────────────────────────────────────────────────┐
│  Gallery Management             [+ Add New Image]   │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  [img]   │  │  [img]   │  │  [img]   │          │
│  │ Food 1   │  │ Food 2   │  │ Profile  │          │
│  │ [Edit]   │  │ [Edit]   │  │ [Edit]   │          │
│  │ [Delete] │  │ [Delete] │  │ [Delete] │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
```

### 4. **Add/Edit Item Modal**
```
┌─────────────────────────────────────────────────────┐
│  Add Gallery Item                    [X]            │
├─────────────────────────────────────────────────────┤
│  Title: [_____________________________]             │
│  Category: [Food ▼]                                 │
│                                                     │
│  Image: [Drag & Drop or Click to Upload]           │
│         ┌─────────────────────────┐                │
│         │   Drop image here       │                │
│         │   or click to browse    │                │
│         └─────────────────────────┘                │
│                                                     │
│         [Cancel]  [Save]                            │
└─────────────────────────────────────────────────────┘
```

### 5. **Videos Manager** (`/admin/videos`)
```
┌─────────────────────────────────────────────────────┐
│  Videos Management              [+ Add New Video]   │
├─────────────────────────────────────────────────────┤
│  Title                  Duration      Actions       │
│  ────────────────────────────────────────────────   │
│  Event Highlights 1     0:45          [Edit] [Del]  │
│  Event Highlights 2     0:52          [Edit] [Del]  │
│  Event Highlights 3     0:38          [Edit] [Del]  │
└─────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema (already created in `migrations/`)

```sql
-- Gallery
gallery_items (id, title, category, image_url, created_at)

-- Videos
videos (id, title, description, video_url, thumb_url, duration, created_at)

-- Portfolio
portfolio_items (id, title, category, description, image_url, created_at)

-- Testimonials
testimonials (id, rating, review, featured, created_at)

-- Admin Users
admin_users (id, username, hashed_password, created_at)
```

---

## 🔨 Implementation Steps

### Phase 1: Backend API (2-3 hours)
1. ✅ Create FastAPI app with CRUD endpoints
2. ✅ Add JWT authentication
3. ✅ Add admin user seed script
4. ✅ Integrate Cloudinary for file uploads
5. ✅ Deploy to Render

### Phase 2: Admin Dashboard (3-4 hours)
1. ✅ Create React admin app (Vite + TypeScript)
2. ✅ Build login page
3. ✅ Build dashboard layout
4. ✅ Build CRUD pages (Gallery, Videos, Portfolio, Testimonials)
5. ✅ Add drag-drop file upload
6. ✅ Deploy to Render (separate service)

### Phase 3: Connect Public Site (1 hour)
1. ✅ Update public site to fetch from API instead of hardcoded data
2. ✅ Test end-to-end flow

---

## 🚀 Tech Stack

### Admin Dashboard
- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **UI**: Custom components + Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **File Upload**: React Dropzone
- **HTTP**: Axios
- **Auth**: JWT stored in memory (React Context)

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL (Render free tier)
- **ORM**: SQLAlchemy
- **Auth**: JWT (python-jose)
- **File Storage**: Cloudinary
- **Password**: bcrypt hashing

---

## 🔐 Security Features

1. **Password Hashing**: bcrypt with 12 rounds
2. **JWT Tokens**: Expire after 24 hours
3. **CORS**: Restricted to admin dashboard domain only
4. **Rate Limiting**: Max 5 login attempts per minute
5. **CSRF Protection**: Token-based
6. **File Upload Validation**: Type, size, content checks
7. **SQL Injection Prevention**: SQLAlchemy parameterized queries

---

## 💰 Cost

| Service | Tier | Cost |
|---------|------|------|
| Public Site (Render) | Static | $0/month |
| Admin Dashboard (Render) | Static | $0/month |
| Backend API (Render) | Web Service | $0/month (free tier) |
| PostgreSQL (Render) | Database | $0/month (free tier) |
| Cloudinary | Free tier | $0/month |
| **Total** | | **$0/month** |

Free tier limits:
- Render: 750 hours/month (enough for 1 service)
- PostgreSQL: 1GB storage
- Cloudinary: 25GB storage + bandwidth

**Verdict**: You can run this entire setup for free.

---

## 📱 Mobile-Friendly Admin

The admin dashboard will be fully responsive:
- Desktop: Full sidebar + multi-column layouts
- Tablet: Collapsed sidebar + 2-column grids
- Mobile: Bottom nav + 1-column, optimized touch targets

---

## 🎯 Benefits

### Before (current):
```
Want to add a photo?
→ Edit code
→ Commit to git
→ Push to GitHub
→ Wait for Render to rebuild (~2 min)
→ Photo appears
```

### After (with admin):
```
Want to add a photo?
→ Login to admin
→ Click "Add Image"
→ Drag & drop photo
→ Click "Save"
→ Photo appears instantly ✨
```

---

## 📋 Next Steps

**Option 1: I Build It Now** (~6-8 hours of work)
- I'll create the full admin dashboard + backend
- You get a working system ready to use

**Option 2: Step-by-Step Guidance**
- I'll guide you through building it yourself
- You learn how everything works

**Option 3: Build Later**
- I've documented everything here
- Build when you're ready to scale

**What would you like me to do?**
