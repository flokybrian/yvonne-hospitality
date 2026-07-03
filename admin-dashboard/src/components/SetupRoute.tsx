/**
 * SetupRoute — only accessible when the user just logged in
 * with the default credentials and hasn't set a custom password yet.
 *
 * If `needsSetup` is false, redirect to the appropriate place:
 *   - Authenticated → dashboard
 *   - Not authenticated → login
 */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ReactNode } from 'react'

export default function SetupRoute({ children }: { children: ReactNode }) {
  const { needsSetup, isAuthenticated } = useAuth()

  if (needsSetup) return <>{children}</>
  if (isAuthenticated) return <Navigate to="/" replace />
  return <Navigate to="/login" replace />
}
