import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiClock, FiX, FiEye, FiMapPin, FiPhone, FiCreditCard } from 'react-icons/fi'
import { getOrders, updateOrder, getBook, updateBook } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import { formatPrice, formatDate, getStatusLabel, getStatusColor } from '../../utils/helpers'
import { toast } from 'react-toastify'
import './Orders.css'

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const fetchOrders = async () => {
    try {
      const res = await getOrders()
      const myOrders = res.data.filter(o => String(o.userId) === String(user.id))
      setOrders(myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchOrders()
  }, [user])

  const canCancelOrder = (status) => ['pending', 'confirmed'].includes(status)

  const handleCancelOrder = async (order) => {
    if (!canCancelOrder(order.status)) {
      toast.info('Chỉ có thể hủy đơn hàng đang chờ xác nhận hoặc đã xác nhận')
      return
    }

    if (!window.confirm('Bạn chắc chắn muốn hủy đơn hàng này?')) return

    setCancellingId(order.id)
    const restoredBooks = []
    try {
      for (const item of order.items) {
        const bookId = item.bookId || item.id
        const bookRes = await getBook(bookId)
        const book = bookRes.data
        await updateBook(book.id, {
          ...book,
          stock: Number(book.stock || 0) + Number(item.quantity || 0)
        })
        restoredBooks.push({ book, quantity: item.quantity })
      }

      try {
        await updateOrder(order.id, {
          ...order,
          status: 'cancelled',
          cancelledAt: new Date().toISOString()
        })
      } catch (err) {
        await Promise.allSettled(
          restoredBooks.map(({ book, quantity }) =>
            updateBook(book.id, {
              ...book,
              stock: Math.max(0, Number(book.stock || 0) - Number(quantity || 0))
            })
          )
        )
        throw err
      }
      toast.success('Đã hủy đơn hàng và hoàn lại tồn kho')
      fetchOrders()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Không thể hủy đơn hàng, vui lòng thử lại')
    } finally {
      setCancellingId(null)
    }
  }

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>
  }

  return (
    <div className="orders-page page-enter">
      <div className="container">
        <h1 className="page-title">
          <FiClock /> Lịch sử mua hàng
        </h1>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3 className="empty-state-title">Chưa có đơn hàng nào</h3>
            <p className="empty-state-text">Hãy bắt đầu mua sắm để có đơn hàng đầu tiên!</p>
            <Link to="/books" className="btn btn-primary">Mua sắm ngay</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card card">
                <div className="order-header">
                  <div className="order-id">
                    <FiPackage />
                    <span>Đơn hàng #{order.id}</span>
                  </div>
                  <span className={`badge badge-${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <span className="order-item-name">{item.title}</span>
                      <span className="order-item-qty">x{item.quantity}</span>
                      <span className="order-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-date">
                    <FiClock /> {formatDate(order.createdAt)}
                  </div>
                  <div className="order-footer-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedOrder(order)}>
                      <FiEye /> Chi tiết
                    </button>
                    {canCancelOrder(order.status) && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancelOrder(order)}
                        disabled={cancellingId === order.id}
                      >
                        <FiX /> {cancellingId === order.id ? 'Đang hủy...' : 'Hủy đơn'}
                      </button>
                    )}
                    <div className="order-total">
                      Tổng: <strong>{formatPrice(order.total)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOrder && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setSelectedOrder(null)}>
            <div className="modal-content order-detail-modal">
              <div className="order-detail-header">
                <div>
                  <h2 className="modal-title">Đơn hàng #{selectedOrder.id}</h2>
                  <p>{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <span className={`badge badge-${getStatusColor(selectedOrder.status)}`}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </div>

              <div className="order-detail-grid">
                <div className="order-detail-box">
                  <h3><FiMapPin /> Giao hàng</h3>
                  <p>{selectedOrder.shippingAddress}</p>
                  <p><FiPhone /> {selectedOrder.phone}</p>
                  {selectedOrder.note && <p>Ghi chú: {selectedOrder.note}</p>}
                </div>
                <div className="order-detail-box">
                  <h3><FiCreditCard /> Thanh toán</h3>
                  <p>{selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : selectedOrder.paymentMethod}</p>
                  {selectedOrder.discountCode && <p>Mã giảm: {selectedOrder.discountCode} ({selectedOrder.discountPercent}%)</p>}
                  {selectedOrder.cancelledAt && <p>Hủy lúc: {formatDate(selectedOrder.cancelledAt)}</p>}
                  {selectedOrder.deliveredAt && <p>Giao lúc: {formatDate(selectedOrder.deliveredAt)}</p>}
                </div>
              </div>

              <div className="order-detail-timeline">
                {getOrderTimeline(selectedOrder).map(step => (
                  <div className={`timeline-step ${step.done ? 'done' : ''}`} key={step.key}>
                    <span></span>
                    <p>{step.label}</p>
                  </div>
                ))}
              </div>

              <div className="order-detail-items">
                {selectedOrder.items.map((item, index) => (
                  <div className="order-detail-item" key={index}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{formatPrice(item.price)} x {item.quantity}</p>
                    </div>
                    <div className="order-detail-item-actions">
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                      {selectedOrder.status === 'delivered' && (
                        <Link className="btn btn-secondary btn-sm" to={`/books/${item.bookId || item.id}?tab=reviews`}>
                          Đánh giá
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-detail-summary">
                <div><span>Tạm tính</span><strong>{formatPrice(selectedOrder.subtotal || selectedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</strong></div>
                {selectedOrder.discountAmount > 0 && <div><span>Giảm giá</span><strong>-{formatPrice(selectedOrder.discountAmount)}</strong></div>}
                <div><span>Phí vận chuyển</span><strong>{formatPrice(selectedOrder.shippingFee || 0)}</strong></div>
                <div className="order-detail-total"><span>Tổng cộng</span><strong>{formatPrice(selectedOrder.total)}</strong></div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>Đóng</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function getOrderTimeline(order) {
  const statusRank = {
    pending: 1,
    confirmed: 2,
    shipping: 3,
    delivered: 4,
    cancelled: 99
  }
  const rank = statusRank[order.status] || 0

  if (order.status === 'cancelled') {
    return [
      { key: 'pending', label: 'Đã đặt hàng', done: true },
      { key: 'cancelled', label: 'Đã hủy', done: true }
    ]
  }

  return [
    { key: 'pending', label: 'Đã đặt hàng', done: rank >= 1 },
    { key: 'confirmed', label: 'Đã xác nhận', done: rank >= 2 },
    { key: 'shipping', label: 'Đang giao', done: rank >= 3 },
    { key: 'delivered', label: 'Đã giao', done: rank >= 4 }
  ]
}
