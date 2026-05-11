import { useState, useEffect } from 'react'
import { FiShoppingBag, FiEdit2 } from 'react-icons/fi'
import { getOrders, updateOrder } from '../../services/api'
import { formatPrice, formatDate, getStatusLabel, getStatusColor } from '../../utils/helpers'
import { toast } from 'react-toastify'
import { ORDER_STATUSES } from '../../utils/constants'
import './Admin.css'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [editOrder, setEditOrder] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  const fetchData = async () => {
    const res = await getOrders()
    setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }

  useEffect(() => { fetchData() }, [])

  const handleStatusUpdate = async () => {
    try {
      await updateOrder(editOrder.id, { ...editOrder, status: newStatus })
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
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td style={{ maxWidth: 250 }}>
                  {order.items.map(i => `${i.title} (x${i.quantity})`).join(', ')}
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
            <h2>Cập nhật đơn hàng #{editOrder.id}</h2>
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
                <strong>Địa chỉ:</strong> {editOrder.shippingAddress}
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
                <strong>SĐT:</strong> {editOrder.phone}
              </p>
              {editOrder.note && (
                <p style={{ color: 'var(--text-secondary)' }}>
                  <strong>Ghi chú:</strong> {editOrder.note}
                </p>
              )}
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
