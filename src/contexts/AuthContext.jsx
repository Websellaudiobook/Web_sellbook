import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getUsers } from '../services/api'
import { toast } from 'react-toastify'
import { STORAGE_KEYS } from '../utils/constants'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER)
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Security: Fetch user by email only, compare password client-side
      // This prevents password from appearing in URL query params
      const res = await loginUser(email)
      const foundUser = res.data.find(u => u.password === password)
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(foundUser))
        toast.success(`Chào mừng ${foundUser.name}!`)
        return { success: true, user: foundUser }
      } else {
        toast.error('Email hoặc mật khẩu không đúng!')
        return { success: false }
      }
    } catch (error) {
      toast.error(error.friendlyMessage || 'Đã xảy ra lỗi, vui lòng thử lại!')
      return { success: false }
    }
  }

  const register = async (userData) => {
    try {
      // Check if email already exists
      const existing = await getUsers()
      const emailExists = existing.data.find(u =>
        String(u.email || '').toLowerCase() === String(userData.email || '').toLowerCase()
      )
      if (emailExists) {
        toast.error('Email đã được sử dụng!')
        return { success: false }
      }

      const newUser = {
        ...userData,
        role: 'user',
        avatar: '',
        createdAt: new Date().toISOString()
      }
      const res = await registerUser(newUser)
      setUser(res.data)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.data))
      toast.success('Đăng ký thành công!')
      return { success: true }
    } catch (error) {
      toast.error(error.friendlyMessage || 'Đã xảy ra lỗi, vui lòng thử lại!')
      return { success: false }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.USER)
    toast.info('Đã đăng xuất!')
  }

  const isAdmin = user?.role === 'admin'

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin,
    setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
