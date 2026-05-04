import { useState, useEffect } from 'react'
import { FiBook, FiUsers, FiShoppingBag, FiDollarSign } from 'react-icons/fi'
import { getBooks, getUsers, getOrders, getCategories } from '../../services/api'
import { formatPrice } from '../../utils/helpers'
import './Admin.css'

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0, revenue: 0, categories: 0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, usersRes, ordersRes, catsRes] = await Promise.all([
          getBooks(), getUsers(), getOrders(), getCategories()
        ])
        const revenue = ordersRes.data
          .filter(o => o.status !== 'cancelled')
          .reduce((sum, o) => sum + o.total, 0)
        setStats({
          books: booksRes.data.length,
          users: usersRes.data.length,
          orders: ordersRes.data.length,
          revenue,
          categories: catsRes.data.length
        })
        setRecentOrders(ordersRes.data.slice(-5).reverse())
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="page-enter">
      <div className="admin-page-header">
        <h1 className="admin-page-title">📊 Dashboard</h1>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon blue"><FiBook /></div>
          <div className="stat-info">
            <h4>Tổng sách</h4>
            <div className="stat-number">{stats.books}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FiShoppingBag /></div>
          <div className="stat-info">
            <h4>Đơn hàng</h4>
            <div className="stat-number">{stats.orders}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><FiDollarSign /></div>
          <div className="stat-info">
            <h4>Doanh thu</h4>
            <div className="stat-number">{formatPrice(stats.revenue)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><FiUsers /></div>
          <div className="stat-info">
            <h4>Người dùng</h4>
            <div className="stat-number">{stats.users}</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Đơn hàng gần đây</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.items.map(i => i.title).join(', ')}</td>
                  <td style={{ fontWeight: 600, color: 'var(--error)' }}>{formatPrice(order.total)}</td>
                  <td>
                    <span className={`badge badge-${order.status === 'delivered' ? 'success' : order.status === 'shipping' ? 'primary' : order.status === 'cancelled' ? 'danger' : 'warning'}`}>
                      {order.status === 'delivered' ? 'Đã giao' : order.status === 'shipping' ? 'Đang giao' : order.status === 'cancelled' ? 'Đã hủy' : 'Chờ xác nhận'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
