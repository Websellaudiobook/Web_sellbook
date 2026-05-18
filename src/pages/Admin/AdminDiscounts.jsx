import { useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiTag } from 'react-icons/fi'
import { getDiscounts, createDiscount, updateDiscount, deleteDiscount } from '../../services/api'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import './Admin.css'

const emptyForm = {
  code: '',
  percent: 10,
  active: true,
  expiresAt: ''
}

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchData = async () => {
    const res = await getDiscounts()
    setDiscounts(res.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      code: form.code.trim().toUpperCase(),
      percent: Number(form.percent) || 0,
      active: !!form.active,
      expiresAt: form.expiresAt || null
    }

    try {
      if (editId) {
        await updateDiscount(editId, payload)
        toast.success('Cập nhật mã giảm giá thành công!')
      } else {
        await createDiscount({ ...payload, createdAt: new Date().toISOString() })
        toast.success('Thêm mã giảm giá mới thành công!')
      }
      setShowForm(false)
      setEditId(null)
      setForm(emptyForm)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  const handleEdit = (item) => {
    setForm({
      code: item.code || '',
      percent: item.percent || 0,
      active: item.active !== false,
      expiresAt: item.expiresAt ? item.expiresAt.slice(0, 10) : ''
    })
    setEditId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteDiscount(id)
      toast.success('Xóa mã giảm giá thành công!')
      setConfirmDelete(null)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  return (
    <div className="page-enter">
      <div className="admin-page-header">
        <h1 className="admin-page-title"><FiTag /> Quản lý mã giảm giá</h1>
        <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }}>
          <FiPlus /> Thêm mã mới
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã</th>
              <th>Phần trăm</th>
              <th>Trạng thái</th>
              <th>Hết hạn</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: 600 }}>{item.code}</td>
                <td>{item.percent}%</td>
                <td>
                  <span className={`badge ${item.active === false ? 'badge-danger' : 'badge-success'}`}>
                    {item.active === false ? 'Tạm tắt' : 'Đang hoạt động'}
                  </span>
                </td>
                <td>{item.expiresAt ? item.expiresAt.slice(0, 10) : 'Không giới hạn'}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(item)}><FiEdit2 /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(item.id)}><FiTrash2 /></button>
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
            <h2>{editId ? 'Cập nhật mã giảm giá' : 'Thêm mã giảm giá mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Mã giảm giá *</label>
                <input className="form-input" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Phần trăm giảm *</label>
                  <input className="form-input" type="number" min="0" max="100" value={form.percent} onChange={(e) => setForm({ ...form, percent: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày hết hạn</label>
                  <input className="form-input" type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                Đang hoạt động
              </label>
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
          title="Xác nhận xóa"
          message="Bạn chắc chắn muốn xóa mã giảm giá này?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
