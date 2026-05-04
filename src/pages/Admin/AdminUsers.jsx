import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi'
import { getUsers, createUser, updateUser, deleteUser } from '../../services/api'
import { formatDate } from '../../utils/helpers'
import { toast } from 'react-toastify'
import './Admin.css'

const emptyUser = { name: '', email: '', password: '', phone: '', address: '', role: 'user' }

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyUser)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchData = async () => {
    const res = await getUsers()
    setUsers(res.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = { ...form, avatar: '', createdAt: editId ? form.createdAt : new Date().toISOString() }
      if (editId) {
        await updateUser(editId, data)
        toast.success('Cập nhật tài khoản thành công!')
      } else {
        // Check duplicate email
        const existing = users.find(u => u.email === form.email)
        if (existing) {
          toast.error('Email đã tồn tại!')
          return
        }
        await createUser(data)
        toast.success('Thêm tài khoản mới thành công!')
      }
      setShowForm(false)
      setEditId(null)
      setForm(emptyUser)
      fetchData()
    } catch (err) {
      toast.error('Có lỗi xảy ra!')
    }
  }

  const handleEdit = (user) => {
    setForm(user)
    setEditId(user.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteUser(id)
      toast.success('Xóa tài khoản thành công!')
      setConfirmDelete(null)
      fetchData()
    } catch (err) {
      toast.error('Có lỗi xảy ra!')
    }
  }

  return (
    <div className="page-enter">
      <div className="admin-page-header">
        <h1 className="admin-page-title"><FiUsers /> Quản lý tài khoản</h1>
        <button className="btn btn-primary" onClick={() => { setForm(emptyUser); setEditId(null); setShowForm(true) }}>
          <FiPlus /> Thêm tài khoản
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || '—'}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(user)}><FiEdit2 /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(user.id)}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="admin-form-modal" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-form-card">
            <h2>{editId ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Họ tên *</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Mật khẩu {editId ? '' : '*'}</label>
                  <input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} required={!editId} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Vai trò</label>
                  <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Địa chỉ</label>
                <input className="form-input" name="address" value={form.address} onChange={handleChange} />
              </div>
              <div className="admin-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">{editId ? 'Cập nhật' : 'Thêm mới'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="admin-form-modal" onClick={(e) => e.target === e.currentTarget && setConfirmDelete(null)}>
          <div className="admin-form-card confirm-dialog">
            <h2>⚠️ Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
            <div className="admin-form-actions" style={{ justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Hủy</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmDelete)}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
