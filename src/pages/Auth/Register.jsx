import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiBookOpen, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import './Auth.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Password strength checker
  const getPasswordStrength = (pass) => {
    if (!pass) return { level: 0, text: '', color: '' }
    let score = 0
    if (pass.length >= 6) score++
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    if (score <= 1) return { level: 1, text: 'Yếu', color: 'var(--error)' }
    if (score <= 3) return { level: 2, text: 'Trung bình', color: '#f59e0b' }
    return { level: 3, text: 'Mạnh', color: 'var(--success)' }
  }

  const passwordStrength = getPasswordStrength(form.password)

  const validatePhone = (phone) => {
    if (!phone) return true // optional field
    return /^0\d{9}$/.test(phone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!')
      return
    }
    if (form.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!')
      return
    }
    if (form.phone && !validatePhone(form.phone)) {
      toast.error('Số điện thoại phải có 10 chữ số và bắt đầu bằng 0!')
      return
    }
    setLoading(true)
    const result = await register(form)
    setLoading(false)
    if (result.success) {
      navigate('/')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1"></div>
        <div className="auth-orb auth-orb-2"></div>
      </div>
      <div className="auth-card animate-scale">
        <div className="auth-logo">
          <FiBookOpen />
          <span>Book<span className="logo-accent">Verse</span></span>
        </div>
        <h1 className="auth-title">Đăng ký</h1>
        <p className="auth-subtitle">Tạo tài khoản mới để mua sắm</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Họ và tên *</label>
            <div className="input-icon">
              <FiUser className="input-icon-left" />
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <div className="input-icon">
              <FiMail className="input-icon-left" />
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu *</label>
            <div className="input-icon">
              <FiLock className="input-icon-left" />
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="Tối thiểu 6 ký tự"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <button type="button" className="input-icon-right" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {form.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div className="strength-fill" style={{ width: `${(passwordStrength.level / 3) * 100}%`, background: passwordStrength.color }}></div>
                </div>
                <span style={{ color: passwordStrength.color, fontSize: '0.75rem' }}>{passwordStrength.text}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <div className="input-icon">
              <FiPhone className="input-icon-left" />
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="0901234567"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ</label>
            <div className="input-icon">
              <FiMapPin className="input-icon-left" />
              <input
                type="text"
                name="address"
                className="form-input"
                placeholder="Số nhà, đường, quận, thành phố"
                value={form.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className="auth-footer">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}
