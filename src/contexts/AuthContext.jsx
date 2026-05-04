import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getUsers } from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('bookstore_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('bookstore_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password)
      if (res.data.length > 0) {
        const userData = res.data[0]
        setUser(userData)
        localStorage.setItem('bookstore_user', JSON.stringify(userData))
        toast.success(`Chào mừng ${userData.name}!`)
        return { success: true, user: userData }
      } else {
        toast.error('Email hoặc mật khẩu không đúng!')
        return { success: false }
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi, vui lòng thử lại!')
      return { success: false }
    }
  }

  const register = async (userData) => {
    try {
      // Check if email already exists
      const existing = await getUsers()
      const emailExists = existing.data.find(u => u.email === userData.email)
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
      localStorage.setItem('bookstore_user', JSON.stringify(res.data))
      toast.success('Đăng ký thành công!')
      return { success: true }
    } catch (error) {
      toast.error('Đã xảy ra lỗi, vui lòng thử lại!')
      return { success: false }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('bookstore_user')
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
