import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiClock, FiEye } from 'react-icons/fi'
import { getOrders } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import { formatPrice, formatDate, getStatusLabel, getStatusColor } from '../../utils/helpers'
import './Orders.css'

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fix: Fetch all orders and filter client-side to avoid JSON server string/number ID mismatch
        const res = await getOrders()
        const myOrders = res.data.filter(o => String(o.userId) === String(user.id))
        setOrders(myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchOrders()
  }, [user])

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
                  <div className="order-total">
                    Tổng: <strong>{formatPrice(order.total)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
