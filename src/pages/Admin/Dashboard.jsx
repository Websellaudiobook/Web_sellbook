import { useState, useEffect } from 'react'
import { FiBook, FiUsers, FiShoppingBag, FiDollarSign } from 'react-icons/fi'
import { getBooks, getUsers, getOrders, getCategories } from '../../services/api'
import { formatPrice, getStatusLabel, getStatusColor } from '../../utils/helpers'
import { toast } from 'react-toastify'
import './Admin.css'
import './Dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0, revenue: 0, categories: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

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
        toast.error(err.friendlyMessage || 'Không thể tải dữ liệu dashboard!')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="page-enter">
        <div className="admin-page-header">
          <h1 className="admin-page-title">📊 Dashboard</h1>
        </div>
        <div className="admin-stats">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="stat-card stat-skeleton">
              <div className="stat-icon-skeleton skeleton-pulse"></div>
              <div className="stat-info-skeleton">
                <div className="skeleton-line-sm skeleton-pulse"></div>
                <div className="skeleton-line-lg skeleton-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

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
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Đơn hàng gần đây</h2>
        {recentOrders.length === 0 ? (
          <div className="dashboard-empty">Chưa có đơn hàng nào</div>
        ) : (
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
                    <td className="order-items-cell">{order.items.map(i => i.title).join(', ')}</td>
                    <td className="price-cell">{formatPrice(order.total)}</td>
                    <td>
                      <span className={`badge badge-${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
