import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute    from './components/ProtectedRoute'
import SetupRoute        from './components/SetupRoute'

import Login             from './pages/Login'
import SetupCredentials  from './pages/SetupCredentials'
import Dashboard         from './pages/Dashboard'
import GalleryManager    from './pages/GalleryManager'
import VideosManager     from './pages/VideosManager'
import PortfolioManager  from './pages/PortfolioManager'
import TestimonialsManager from './pages/TestimonialsManager'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* First-time setup — only after default-cred login */}
        <Route
          path="/setup"
          element={
            <SetupRoute>
              <SetupCredentials />
            </SetupRoute>
          }
        />

        {/* Protected admin pages */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/gallery"      element={<ProtectedRoute><GalleryManager /></ProtectedRoute>} />
        <Route path="/videos"       element={<ProtectedRoute><VideosManager /></ProtectedRoute>} />
        <Route path="/portfolio"    element={<ProtectedRoute><PortfolioManager /></ProtectedRoute>} />
        <Route path="/testimonials" element={<ProtectedRoute><TestimonialsManager /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
