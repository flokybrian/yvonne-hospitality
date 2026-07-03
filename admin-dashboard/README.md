# Yvonne Hospitality - Admin Dashboard

A separate admin interface for managing the Yvonne Hospitality website content.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd admin-dashboard
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Opens at: http://localhost:5174

### 3. Login
- **Username**: `yvonne`
- **Password**: `admin123`

## 📁 What's Included

### Core Features
- ✅ Login page with authentication
- ✅ Protected dashboard routes
- ✅ Sidebar navigation
- ✅ Gallery management (view, edit, delete)
- ✅ Videos manager (template)
- ✅ Portfolio manager (template)
- ✅ Testimonials manager (template)

### Tech Stack
- React 18 + TypeScript
- React Router v6 for navigation
- Inline styles (no external CSS framework)
- Context API for auth state
- LocalStorage for session persistence

## 🔐 Authentication

Current Implementation:
- **Temporary hardcoded auth** (username: `yvonne`, password: `admin123`)
- Token stored in localStorage
- All routes protected except `/login`

**To upgrade to real auth:**
Replace in `src/context/AuthContext.tsx`:
```typescript
// Replace this:
if (username === 'yvonne' && password === 'admin123') { ... }

// With API call:
const response = await axios.post('/api/auth/login', { username, password })
const { token, user } = response.data
localStorage.setItem('admin_token', token)
```

## 📂 Project Structure

```
admin-dashboard/
├── src/
│   ├── components/
│   │   ├── DashboardLayout.tsx    # Sidebar + header layout
│   │   └── ProtectedRoute.tsx     # Auth guard for routes
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication state
│   ├── pages/
│   │   ├── Login.tsx              # Login form
│   │   ├── Dashboard.tsx          # Homepage with stats
│   │   ├── GalleryManager.tsx     # Gallery CRUD interface
│   │   ├── VideosManager.tsx      # Videos CRUD (template)
│   │   ├── PortfolioManager.tsx   # Portfolio CRUD (template)
│   │   └── TestimonialsManager.tsx
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx                    # Router setup
│   └── main.tsx                   # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Features Overview

### Dashboard Home
- Quick stats for each content type
- Links to management pages
- Welcome message

### Gallery Manager
- Grid view of all gallery items
- Edit button (opens modal)
- Delete button (with confirmation)
- Add new button (opens empty modal)
- Shows title, category, image thumbnail

### Other Managers
- Templates provided
- Copy Gallery manager pattern to implement

## 🔨 Next Steps to Complete

### Phase 1: Add File Uploads
Use one of these options:

**Option A: Cloudinary Widget (Easiest)**
```bash
npm install cloudinary-react
```

```typescript
import { Image } from 'cloudinary-react'
// Add Cloudinary upload widget to modals
```

**Option B: React Dropzone**
```typescript
import { useDropzone } from 'react-dropzone'
// Already installed, just integrate
```

### Phase 2: Connect to Backend API
Replace mock data with real API calls:

```typescript
// In GalleryManager.tsx
import axios from 'axios'

const { data } = await axios.get('/api/gallery')
setItems(data)
```

### Phase 3: Build Videos/Portfolio/Testimonials
Copy the GalleryManager pattern for each:
- VideosManager.tsx
- PortfolioManager.tsx
- TestimonialsManager.tsx

### Phase 4: Deploy to Render
```bash
npm run build
# Upload dist/ folder to Render static site
# URL: admin-yvonne.onrender.com
```

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

Output goes to `dist/` folder.

### Deploy to Render
1. Create new "Static Site" on Render
2. Connect this repo
3. Build command: `cd admin-dashboard && npm install && npm run build`
4. Publish directory: `admin-dashboard/dist`
5. Environment: Add `VITE_API_URL` (your backend URL)

## 📝 Environment Variables

Create `.env`:
```env
VITE_API_URL=https://yvonne-api.onrender.com/api/v1
```

## 🔐 Change Default Password

In `src/context/AuthContext.tsx`, line 20:
```typescript
if (username === 'yvonne' && password === 'YOUR_NEW_PASSWORD') {
```

**Better:** Use environment variable:
```typescript
if (username === 'yvonne' && password === import.meta.env.VITE_ADMIN_PASSWORD) {
```

Then add to `.env`:
```env
VITE_ADMIN_PASSWORD=your_secure_password_here
```

## 🎯 Screenshots

### Login Page
- Clean centered form
- Username + password fields
- Error messages

### Dashboard
- 4 stat cards (Gallery, Videos, Portfolio, Testimonials)
- Color-coded with icons
- Quick tips section

### Gallery Manager
- Grid of cards with images
- Edit/Delete buttons on each card
- Add New button (top right)
- Modal for add/edit

## 💡 Tips

1. **Mock Data**: Current version uses hardcoded data arrays - replace with API calls when backend is ready
2. **Styling**: Uses inline styles for simplicity - can migrate to CSS modules later
3. **Auth**: Temporary localStorage auth - upgrade to JWT + refresh tokens for production
4. **File Uploads**: Modal structure ready, just add upload widget integration

## 🐛 Known Limitations

- [ ] File uploads not yet integrated (needs Cloudinary widget or API endpoint)
- [ ] Videos/Portfolio/Testimonials managers are stubs (copy Gallery pattern)
- [ ] No form validation (add React Hook Form validation)
- [ ] No loading states (add spinners during API calls)
- [ ] No error handling (add try-catch + error messages)

## 📦 Dependencies

```json
"react": "^18.3.1"
"react-router-dom": "^6.24.1"
"react-icons": "^5.2.1"
"axios": "^1.7.2"
"react-dropzone": "^14.2.3"
"react-hook-form": "^7.52.0"
```

## 🤝 Contributing

This is a personal project for Yvonne Hospitality. To extend:
1. Copy the pattern from GalleryManager.tsx
2. Add proper API integration
3. Add file upload widgets
4. Deploy to production

---

**Status**: Foundation complete. Ready for API integration and file uploads.
