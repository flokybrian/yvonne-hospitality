import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: { username: string } | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_token') !== null
  })
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const savedUser = localStorage.getItem('admin_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = async (username: string, password: string): Promise<boolean> => {
    // Temporary hardcoded auth - replace with real API later
    if (username === 'yvonne' && password === 'admin123') {
      const userData = { username: 'yvonne' }
      localStorage.setItem('admin_token', 'temp_token_' + Date.now())
      localStorage.setItem('admin_user', JSON.stringify(userData))
      setUser(userData)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
