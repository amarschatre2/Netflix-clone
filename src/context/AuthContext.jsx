import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'nf_user'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to read auth from storage', error)
    } finally {
      setInitializing(false)
    }
  }, [])

  const signup = async ({ name, email, password }) => {
    const trimmedName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()

    const newUser = {
      name: trimmedName,
      email: normalizedEmail,
      password,
    }

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
      setUser(newUser)
    } catch (error) {
      console.error('Failed to persist user', error)
      throw new Error('Failed to save your account. Please try again.')
    }
  }

  const login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()

    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) {
      throw new Error('No account found. Please sign up first.')
    }

    const existing = JSON.parse(stored)

    if (existing.email !== normalizedEmail || existing.password !== password) {
      throw new Error('Invalid email or password.')
    }

    setUser(existing)
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    initializing,
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

