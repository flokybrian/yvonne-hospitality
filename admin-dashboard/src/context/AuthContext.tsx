import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  username: string
}

interface AuthContextType {
  isAuthenticated: boolean
  needsSetup: boolean          // true when using default credentials for first time
  user: User | null
  login: (username: string, password: string) => Promise<'ok' | 'setup_required' | 'invalid'>
  completeSetup: (newUsername: string, newPassword: string) => void
  logout: () => void
}

const DEFAULT_USERNAME = 'yvonne'
const DEFAULT_PASSWORD = 'admin123'
const STORAGE_KEY_TOKEN   = 'admin_token'
const STORAGE_KEY_USER    = 'admin_user'
const STORAGE_KEY_CREDS   = 'admin_credentials'   // stores the custom creds after first-time setup
const STORAGE_KEY_SETUP   = 'admin_setup_done'    // boolean flag

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_TOKEN) !== null
  })

  const [needsSetup, setNeedsSetup] = useState(false)

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER)
    return saved ? (JSON.parse(saved) as User) : null
  })

  // ─── Login ────────────────────────────────────────────────────────────────

  const login = async (
    username: string,
    password: string
  ): Promise<'ok' | 'setup_required' | 'invalid'> => {
    const setupDone = localStorage.getItem(STORAGE_KEY_SETUP) === 'true'

    if (setupDone) {
      // ── After first-time setup: use the custom credentials ──────────────
      const stored = localStorage.getItem(STORAGE_KEY_CREDS)
      if (!stored) return 'invalid'

      const { username: savedUser, password: savedPass } = JSON.parse(stored) as {
        username: string
        password: string
      }

      if (username === savedUser && password === savedPass) {
        _startSession(username)
        return 'ok'
      }
      return 'invalid'
    } else {
      // ── First ever login: check default credentials ─────────────────────
      if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Don't start a full session yet — force setup first
        setNeedsSetup(true)
        return 'setup_required'
      }
      return 'invalid'
    }
  }

  // ─── Complete first-time setup ────────────────────────────────────────────

  const completeSetup = (newUsername: string, newPassword: string) => {
    // Persist the new credentials
    localStorage.setItem(
      STORAGE_KEY_CREDS,
      JSON.stringify({ username: newUsername, password: newPassword })
    )
    // Mark setup as complete so default creds can never be used again
    localStorage.setItem(STORAGE_KEY_SETUP, 'true')

    setNeedsSetup(false)
    _startSession(newUsername)
  }

  // ─── Logout ───────────────────────────────────────────────────────────────

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    localStorage.removeItem(STORAGE_KEY_USER)
    setUser(null)
    setIsAuthenticated(false)
    setNeedsSetup(false)
  }

  // ─── Internal helpers ─────────────────────────────────────────────────────

  const _startSession = (username: string) => {
    const userData: User = { username }
    localStorage.setItem(STORAGE_KEY_TOKEN, 'session_' + Date.now())
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData))
    setUser(userData)
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, needsSetup, user, login, completeSetup, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
