/**
 * AuthContext.tsx
 * ──────────────────────────────────────────────────────────────────
 * Security policy:
 *  • 2 failed attempts  → page permanently blocked (this session)
 *  • On 2nd failure     → email + SMS alert dispatched
 *  • Lockout persisted  → localStorage flag; only an admin-generated
 *    unlock token (or manual localStorage clear) can lift it
 *  • Default creds      → one-time use only (setup flow)
 *  • Artificial delay   → 800 ms per attempt (brute-force throttle)
 * ──────────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, ReactNode } from 'react'
import { dispatchSecurityAlert }                          from '../lib/securityAlerts'

// ─── Types ───────────────────────────────────────────────────────────────────

interface User { username: string }

type LoginResult = 'ok' | 'setup_required' | 'invalid' | 'locked'

interface AuthContextType {
  isAuthenticated : boolean
  needsSetup      : boolean
  isLocked        : boolean          // true = page is blocked
  failedAttempts  : number           // 0 / 1 / 2+
  user            : User | null
  login           : (u: string, p: string) => Promise<LoginResult>
  completeSetup   : (u: string, p: string) => void
  logout          : () => void
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEY_TOKEN    = 'admin_token'
const KEY_USER     = 'admin_user'
const KEY_CREDS    = 'admin_credentials'
const KEY_SETUP    = 'admin_setup_done'
const KEY_LOCKED   = 'admin_locked'          // 'true' when account is locked
const KEY_ATTEMPTS = 'admin_failed_attempts' // '0' | '1' | '2'

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_USERNAME  = 'yvonne'
const DEFAULT_PASSWORD  = 'admin123'
const MAX_ATTEMPTS      = 2            // lock after 2 failures
const ATTEMPT_DELAY_MS  = 800          // artificial throttle per attempt

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null)

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(KEY_TOKEN) !== null
  )

  const [needsSetup, setNeedsSetup] = useState(false)

  const [isLocked, setIsLocked] = useState(
    () => localStorage.getItem(KEY_LOCKED) === 'true'
  )

  const [failedAttempts, setFailedAttempts] = useState(
    () => parseInt(localStorage.getItem(KEY_ATTEMPTS) ?? '0', 10)
  )

  const [user, setUser] = useState<User | null>(() => {
    const s = localStorage.getItem(KEY_USER)
    return s ? (JSON.parse(s) as User) : null
  })

  // ─── Login ───────────────────────────────────────────────────────────────

  const login = async (username: string, password: string): Promise<LoginResult> => {

    // 1. Already locked?
    if (isLocked || localStorage.getItem(KEY_LOCKED) === 'true') {
      return 'locked'
    }

    // 2. Artificial delay (brute-force throttle)
    await new Promise(r => setTimeout(r, ATTEMPT_DELAY_MS))

    // 3. Validate credentials
    const setupDone = localStorage.getItem(KEY_SETUP) === 'true'
    let credentialsMatch = false

    if (setupDone) {
      const stored = localStorage.getItem(KEY_CREDS)
      if (stored) {
        const { username: su, password: sp } = JSON.parse(stored) as {
          username: string; password: string
        }
        credentialsMatch = username === su && password === sp
      }
    } else {
      // Default credentials (first-time only)
      credentialsMatch = username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD
    }

    // 4a. Credentials matched ─────────────────────────────────────────────
    if (credentialsMatch) {
      // Reset attempt counter on success
      _clearAttempts()

      if (!setupDone) {
        setNeedsSetup(true)
        return 'setup_required'
      }

      _startSession(username)
      return 'ok'
    }

    // 4b. Credentials WRONG ───────────────────────────────────────────────
    const newCount = failedAttempts + 1
    setFailedAttempts(newCount)
    localStorage.setItem(KEY_ATTEMPTS, String(newCount))

    if (newCount >= MAX_ATTEMPTS) {
      // Lock
      setIsLocked(true)
      localStorage.setItem(KEY_LOCKED, 'true')

      // Fire alerts (non-blocking — we don't await here intentionally)
      dispatchSecurityAlert(username).catch(() => {/* silent */})

      return 'locked'
    }

    return 'invalid'
  }

  // ─── Complete first-time setup ───────────────────────────────────────────

  const completeSetup = (newUsername: string, newPassword: string) => {
    localStorage.setItem(KEY_CREDS, JSON.stringify({
      username: newUsername,
      password: newPassword,
    }))
    localStorage.setItem(KEY_SETUP, 'true')
    _clearAttempts()
    setNeedsSetup(false)
    _startSession(newUsername)
  }

  // ─── Logout ──────────────────────────────────────────────────────────────

  const logout = () => {
    localStorage.removeItem(KEY_TOKEN)
    localStorage.removeItem(KEY_USER)
    setUser(null)
    setIsAuthenticated(false)
    setNeedsSetup(false)
    // Note: lockout is NOT cleared on logout (intentional)
  }

  // ─── Internal helpers ────────────────────────────────────────────────────

  const _startSession = (username: string) => {
    const u: User = { username }
    localStorage.setItem(KEY_TOKEN, 'session_' + Date.now())
    localStorage.setItem(KEY_USER, JSON.stringify(u))
    setUser(u)
    setIsAuthenticated(true)
  }

  const _clearAttempts = () => {
    setFailedAttempts(0)
    localStorage.setItem(KEY_ATTEMPTS, '0')
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      needsSetup,
      isLocked,
      failedAttempts,
      user,
      login,
      completeSetup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
