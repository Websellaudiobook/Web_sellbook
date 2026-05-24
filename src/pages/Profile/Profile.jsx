import { useState } from 'react'
import { FiUser, FiSave } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { updateUser } from '../../services/api'
import { STORAGE_KEYS } from '../../utils/constants'
import { toast } from 'react-toastify'
import './Profile.css'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      toast.error('Vui lòng nhập tên')
      return
    }
    if (form.password && form.password !== form.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }

    const updated = {
      ...user,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim()
    }
    if (form.password) {
      updated.password = form.password
    }

    setLoading(true)
    try {
      await updateUser(user.id, updated)
      setUser(updated)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated))
      setForm(prev => ({ ...prev, password: '', confirmPassword: '' }))
      toast.success('Cập nhật thông tin thành công')
    } catch (err) {
      toast.error(err.friendlyMessage || 'Cập nhật thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page page-enter">
      <div className="container">
        <div className="profile-header">
          <h1 className="page-title">
            <FiUser /> Thông tin tài khoản
          </h1>
        </div>

        <form className="profile-card card" onSubmit={handleSubmit}>
          <div className="profile-grid">
            <div className="form-group">
              <label className="form-label">Họ tên *</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" name="email" value={form.email} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <input className="form-input" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Địa chỉ</label>
              <input className="form-input" name="address" value={form.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Mật khẩu mới</label>
              <input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input className="form-input" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FiSave /> {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
