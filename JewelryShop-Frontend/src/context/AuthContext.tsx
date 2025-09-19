import React, { createContext, useContext, useState, useEffect } from 'react'
import { isAuthenticated, logout as apiLogout } from '../services/api'

interface AuthContextType {
  isAuth: boolean
  login: () => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on app start
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      setIsAuth(authenticated)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = () => {
    setIsAuth(true)
  }

  const logout = async () => {
    await apiLogout()
    setIsAuth(false)
  }

  const value = {
    isAuth,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}