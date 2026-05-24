import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiEdit2 } from 'react-icons/fi'
import { getOrders, updateOrder, getBook, updateBook, getReviews } from '../../services/api'
import { formatPrice, formatDate, getStatusLabel, getStatusColor } from '../../utils/helpers'
import { toast } from 'react-toastify'
import { ORDER_STATUSES } from '../../utils/constants'
import './Admin.css'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [reviews, setReviews] = useState([])
  const [editOrder, setEditOrder] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  const fetchData = async () => {
    const [ordersRes, reviewsRes] = await Promise.all([getOrders(), getReviews()])
    setOrders(ordersRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    setReviews(reviewsRes.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleStatusUpdate = async () => {
    try {
      if (newStatus === editOrder.status) {
        setEditOrder(null)
        return
      }

      const booksToUpdate = await Promise.all(
        editOrder.items.map(async item => {
          const bookRes = await getBook(item.bookId || item.id)
          return { item, book: bookRes.data }
        })
      )

      if (editOrder.status === 'cancelled' && newStatus !== 'cancelled') {
        const stockErrors = booksToUpdate
          .filter(({ item, book }) => Number(book.stock || 0) < Number(item.quantity || 0))
          .map(({ item, book }) => `"${item.title}" chỉ còn ${book.stock || 0} sản phẩm`)

        if (stockErrors.length > 0) {
          toast.error(stockErrors.join(', '))
          return
        }
      }

      await Promise.all(
        booksToUpdate.map(({ item, book }) => {
          const quantity = Number(item.quantity || 0)
          let stock = Number(book.stock || 0)
          let sold = Number(book.sold || 0)

          if (editOrder.status !== 'cancelled' && newStatus === 'cancelled') {
            stock += quantity
          }

          if (editOrder.status === 'cancelled' && newStatus !== 'cancelled') {
            stock = Math.max(0, stock - quantity)
          }

          if (editOrder.status !== 'delivered' && newStatus === 'delivered') {
            sold += quantity
          }

          if (editOrder.status === 'delivered' && newStatus !== 'delivered') {
            sold = Math.max(0, sold - quantity)
          }

          return updateBook(book.id, { ...book, stock, sold })
        })
      )
      
      try {
        await updateOrder(editOrder.id, {
          ...editOrder,
          status: newStatus,
          cancelledAt: newStatus === 'cancelled' ? new Date().toISOString() : editOrder.cancelledAt || null,
          deliveredAt: newStatus === 'delivered' ? new Date().toISOString() : editOrder.deliveredAt || null
        })
      } catch (err) {
        await Promise.allSettled(
          booksToUpdate.map(({ book }) => updateBook(book.id, book))
        )
        throw err
      }
      toast.success('Cập nhật trạng thái thành công!')
      setEditOrder(null)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  return (
    <div className="page-enter">
      <div className="admin-page-header">
        <h1 className="admin-page-title"><FiShoppingBag /> Quản lý đơn hàng</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>
                  <div style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order.items.map(i => `${i.title} (x${i.quantity})`).join(', ')}
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--error)' }}>{formatPrice(order.total)}</td>
                <td>
                  <span className="badge badge-info">
                    {order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod === 'banking' ? 'Banking' : 'MoMo'}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setEditOrder(order); setNewStatus(order.status) }}
                  >
                    <FiEdit2 /> Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editOrder && (
        <div className="admin-form-modal" onClick={(e) => e.target === e.currentTarget && setEditOrder(null)}>
          <div className="admin-form-card">
            <h2>Chi tiết đơn hàng</h2>
            <div style={{ marginBottom: 24, maxHeight: '60vh', overflowY: 'auto', paddingRight: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.85rem', textTransform: 'uppercase' }}>Thông tin khách hàng</h4>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}><strong>SĐT:</strong> {editOrder.phone}</p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}><strong>Địa chỉ:</strong> {editOrder.shippingAddress}</p>
                  {editOrder.note && <p style={{ color: 'var(--text-secondary)' }}><strong>Ghi chú:</strong> {editOrder.note}</p>}
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.85rem', textTransform: 'uppercase' }}>Thông tin thanh toán</h4>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <strong>Hình thức:</strong>
                    <span className="badge badge-info">{editOrder.paymentMethod === 'cod' ? 'COD' : editOrder.paymentMethod === 'banking' ? 'Banking' : 'MoMo'}</span>
                  </p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}><strong>Ngày đặt:</strong> {formatDate(editOrder.createdAt)}</p>
                </div>
              </div>
              
              <h4 style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.85rem', textTransform: 'uppercase' }}>Sản phẩm đã mua</h4>
              <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 16 }}>
                {editOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx !== editOrder.items.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.title}</span>
                      <span style={{ color: 'var(--text-muted)' }}>x{item.quantity}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {getOrderItemReview(editOrder, item, reviews) ? (
                        <Link className="btn btn-secondary btn-sm" to={`/books/${item.bookId || item.id}?tab=reviews`}>
                          Đã đánh giá
                        </Link>
                      ) : editOrder.status === 'delivered' ? (
                        <span className="badge badge-warning">Chưa đánh giá</span>
                      ) : null}
                      <span style={{ color: 'var(--text-primary)' }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 16, borderTop: '1px dashed var(--border-color)', fontWeight: 700, fontSize: '1.1rem' }}>
                  <span>Tổng cộng:</span>
                  <span style={{ color: 'var(--error)' }}>{formatPrice(editOrder.total)}</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Trạng thái đơn hàng</label>
              <select
                className="form-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {ORDER_STATUSES.map(s => (
                  <option key={s} value={s}>{getStatusLabel(s)}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-actions">
              <button className="btn btn-secondary" onClick={() => setEditOrder(null)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleStatusUpdate}>Cập nhật</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getOrderItemReview(order, item, reviews) {
  return reviews.find(review =>
    String(review.userId) === String(order.userId) &&
    String(review.bookId) === String(item.bookId || item.id)
  )
}
