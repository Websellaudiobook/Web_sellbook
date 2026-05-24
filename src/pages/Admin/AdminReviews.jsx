import { useEffect, useMemo, useState } from 'react'
import { FiMessageSquare, FiStar, FiTrash2 } from 'react-icons/fi'
import { getBooks, getReviews, deleteReview } from '../../services/api'
import { formatDate } from '../../utils/helpers'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import './Admin.css'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [books, setBooks] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)

  const bookMap = useMemo(() => {
    return books.reduce((map, book) => {
      map[String(book.id)] = book.title
      return map
    }, {})
  }, [books])

  const fetchData = async () => {
    const [reviewsRes, booksRes] = await Promise.all([getReviews(), getBooks()])
    setReviews([...reviewsRes.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    setBooks(booksRes.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id) => {
    try {
      await deleteReview(id)
      toast.success('Xóa đánh giá thành công!')
      setConfirmDelete(null)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  return (
    <div className="page-enter">
      <div className="admin-page-header">
        <h1 className="admin-page-title"><FiMessageSquare /> Quản lý đánh giá</h1>
      </div>

      <div className="table-container">
        <table className="data-table admin-reviews-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sách</th>
              <th>Người đánh giá</th>
              <th>Số sao</th>
              <th>Nội dung</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {bookMap[String(review.bookId)] || `Sách #${review.bookId}`}
                </td>
                <td>{review.userName}</td>
                <td>
                  <span className="admin-review-rating">
                    <FiStar fill="#f59e0b" /> {review.rating}/5
                  </span>
                </td>
                <td>
                  <div className="admin-review-comment">{review.comment}</div>
                </td>
                <td>{formatDate(review.createdAt)}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => setConfirmDelete(review.id)}
                      title="Xóa đánh giá"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 32 }}>
                  Chưa có đánh giá nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title="Xác nhận xóa"
          message="Bạn chắc chắn muốn xóa đánh giá này?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
