import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiGrid } from 'react-icons/fi'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import './Admin.css'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', image: '' })
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchData = async () => {
    const res = await getCategories()
    setCategories(res.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await updateCategory(editId, form)
        toast.success('Cập nhật danh mục thành công!')
      } else {
        await createCategory(form)
        toast.success('Thêm danh mục mới thành công!')
      }
      setShowForm(false)
      setEditId(null)
      setForm({ name: '', description: '', image: '' })
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  const handleEdit = (cat) => {
    setForm({ name: cat.name, description: cat.description, image: cat.image })
    setEditId(cat.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id)
      toast.success('Xóa danh mục thành công!')
      setConfirmDelete(null)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  return (
    <div className="page-enter">
      <div className="admin-page-header">
        <h1 className="admin-page-title"><FiGrid /> Quản lý danh mục</h1>
        <button className="btn btn-primary" onClick={() => { setForm({ name: '', description: '', image: '' }); setEditId(null); setShowForm(true) }}>
          <FiPlus /> Thêm danh mục
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td><img src={cat.image} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} /></td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cat.name}</td>
                <td>{cat.description}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(cat)}><FiEdit2 /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(cat.id)}><FiTrash2 /></button>
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
            <h2>{editId ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Tên danh mục *</label>
                <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Mô tả</label>
                <textarea className="form-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Link ảnh</label>
                <input className="form-input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
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
        <ConfirmDialog
          title="⚠️ Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa danh mục này?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
