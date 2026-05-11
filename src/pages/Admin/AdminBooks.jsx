import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiBook } from 'react-icons/fi'
import { getBooks, createBook, updateBook, deleteBook, getCategories } from '../../services/api'
import { formatPrice } from '../../utils/helpers'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import './Admin.css'

const emptyBook = {
  title: '', author: '', description: '', price: '', originalPrice: '',
  image: '', categoryId: '', stock: '', rating: 4.5, reviews: 0,
  publisher: '', publishYear: 2026, pages: '', language: 'Tiếng Việt',
  isbn: '', featured: false, bestseller: false
}

export default function AdminBooks() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyBook)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchData = async () => {
    const [booksRes, catsRes] = await Promise.all([getBooks(), getCategories()])
    setBooks(booksRes.data)
    setCategories(catsRes.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      categoryId: Number(form.categoryId),
      stock: Number(form.stock),
      pages: Number(form.pages),
      publishYear: Number(form.publishYear),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      createdAt: editId ? form.createdAt : new Date().toISOString()
    }
    try {
      if (editId) {
        await updateBook(editId, data)
        toast.success('Cập nhật sách thành công!')
      } else {
        await createBook(data)
        toast.success('Thêm sách mới thành công!')
      }
      setShowForm(false)
      setEditId(null)
      setForm(emptyBook)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  const handleEdit = (book) => {
    setForm(book)
    setEditId(book.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteBook(id)
      toast.success('Xóa sách thành công!')
      setConfirmDelete(null)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || '—'

  return (
    <div className="page-enter">
      <div className="admin-page-header">
        <h1 className="admin-page-title"><FiBook /> Quản lý sách</h1>
        <button className="btn btn-primary" onClick={() => { setForm(emptyBook); setEditId(null); setShowForm(true) }}>
          <FiPlus /> Thêm sách mới
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Kho</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td><img src={book.image} alt="" style={{ width: 40, height: 52, objectFit: 'cover', borderRadius: 4 }} /></td>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)', maxWidth: 200 }}>{book.title}</td>
                <td>{book.author}</td>
                <td><span className="badge badge-primary">{getCategoryName(book.categoryId)}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--error)' }}>{formatPrice(book.price)}</td>
                <td>{book.stock}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(book)}><FiEdit2 /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(book.id)}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="admin-form-modal" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-form-card">
            <h2>{editId ? 'Cập nhật sách' : 'Thêm sách mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Tên sách *</label>
                <input className="form-input" name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Tác giả *</label>
                  <input className="form-input" name="author" value={form.author} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Danh mục *</label>
                  <select className="form-select" name="categoryId" value={form.categoryId} onChange={handleChange} required>
                    <option value="">Chọn danh mục</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Mô tả</label>
                <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Giá bán *</label>
                  <input className="form-input" type="number" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Giá gốc</label>
                  <input className="form-input" type="number" name="originalPrice" value={form.originalPrice} onChange={handleChange} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Số lượng tồn kho *</label>
                  <input className="form-input" type="number" name="stock" value={form.stock} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Số trang</label>
                  <input className="form-input" type="number" name="pages" value={form.pages} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Link ảnh bìa</label>
                <input className="form-input" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">NXB</label>
                  <input className="form-input" name="publisher" value={form.publisher} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Năm XB</label>
                  <input className="form-input" type="number" name="publishYear" value={form.publishYear} onChange={handleChange} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="form-group">
                  <label className="form-label">Ngôn ngữ</label>
                  <input className="form-input" name="language" value={form.language} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">ISBN</label>
                  <input className="form-input" name="isbn" value={form.isbn} onChange={handleChange} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, margin: '8px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Nổi bật
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="bestseller" checked={form.bestseller} onChange={handleChange} /> Bán chạy
                </label>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">{editId ? 'Cập nhật' : 'Thêm mới'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <ConfirmDialog
          title="⚠️ Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa sách này? Hành động này không thể hoàn tác."
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
