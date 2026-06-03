import { useState, useEffect, useMemo } from 'react'
import { FiBook, FiUsers, FiShoppingBag, FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi'
import { getBooks, getUsers, getOrders, getCategories } from '../../services/api'
import { formatPrice, formatDate, getStatusLabel, getStatusColor } from '../../utils/helpers'
import { toast } from 'react-toastify'
import './Admin.css'
import './Dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0, revenue: 0, categories: 0 })
  const [orders, setOrders] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey())

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, usersRes, ordersRes, catsRes] = await Promise.all([
          getBooks(), getUsers(), getOrders(), getCategories()
        ])
        const revenue = ordersRes.data
          .filter(isRevenueOrder)
          .reduce((sum, o) => sum + Number(o.total || 0), 0)
        setStats({
          books: booksRes.data.length,
          users: usersRes.data.length,
          orders: ordersRes.data.length,
          revenue,
          categories: catsRes.data.length
        })
        setOrders(ordersRes.data)
        setRecentOrders(ordersRes.data.slice(-5).reverse())
      } catch (err) {
        toast.error(err.friendlyMessage || 'Không thể tải dữ liệu dashboard!')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const monthOptions = useMemo(() => {
    const keys = new Set([getCurrentMonthKey()])

    orders.forEach(order => {
      const date = getOrderDate(order)
      if (date) keys.add(toMonthKey(date))
    })

    return Array.from(keys)
      .sort((a, b) => b.localeCompare(a))
      .map(key => ({ value: key, label: formatMonthLabel(key) }))
  }, [orders])

  const monthlyRevenue = useMemo(() => {
    const monthOrders = orders.filter(order => {
      const date = getOrderDate(order)
      return date && toMonthKey(date) === selectedMonth
    })

    const revenueOrders = monthOrders.filter(isRevenueOrder)
    const pendingOrders = monthOrders.filter(order => ['pending', 'confirmed', 'shipping'].includes(order.status))
    const cancelledOrders = monthOrders.filter(order => order.status === 'cancelled')
    const revenue = revenueOrders.reduce((sum, order) => sum + Number(order.total || 0), 0)
    const pendingValue = pendingOrders.reduce((sum, order) => sum + Number(order.total || 0), 0)
    const maxRevenue = Math.max(
      ...monthOptions.map(option => getMonthRevenue(orders, option.value)),
      revenue,
      1
    )

    return {
      monthOrders,
      revenueOrders,
      pendingOrders,
      cancelledOrders,
      revenue,
      pendingValue,
      maxRevenue,
      averageOrderValue: revenueOrders.length ? revenue / revenueOrders.length : 0
    }
  }, [orders, selectedMonth, monthOptions])

  const revenueTrend = useMemo(() => {
    return monthOptions
      .slice()
      .reverse()
      .map(option => ({
        ...option,
        revenue: getMonthRevenue(orders, option.value)
      }))
  }, [orders, monthOptions])

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

      <div className="dashboard-section revenue-section">
        <div className="dashboard-section-header">
          <div>
            <h2 className="dashboard-section-title"><FiTrendingUp /> Doanh thu theo tháng</h2>
            <p className="dashboard-section-subtitle">Chỉ ghi nhận doanh thu từ đơn đã giao thành công.</p>
          </div>
          <label className="month-filter">
            <FiCalendar />
            <select
              className="form-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {monthOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="monthly-revenue-grid">
          <div className="monthly-revenue-main">
            <span className="monthly-revenue-label">Doanh thu {formatMonthLabel(selectedMonth)}</span>
            <strong>{formatPrice(monthlyRevenue.revenue)}</strong>
            <div className="monthly-revenue-meta">
              <span>{monthlyRevenue.revenueOrders.length} đơn đã giao</span>
              <span>{formatPrice(monthlyRevenue.averageOrderValue)} / đơn</span>
            </div>
          </div>
          <div className="monthly-mini-stat">
            <span>Tổng đơn trong tháng</span>
            <strong>{monthlyRevenue.monthOrders.length}</strong>
          </div>
          <div className="monthly-mini-stat">
            <span>Đang xử lý</span>
            <strong>{formatPrice(monthlyRevenue.pendingValue)}</strong>
          </div>
          <div className="monthly-mini-stat">
            <span>Đơn đã hủy</span>
            <strong>{monthlyRevenue.cancelledOrders.length}</strong>
          </div>
        </div>

        <div className="revenue-chart" aria-label="Biểu đồ doanh thu theo tháng">
          {revenueTrend.map(month => (
            <div key={month.value} className="revenue-bar-item">
              <div className="revenue-bar-track">
                <div
                  className="revenue-bar-fill"
                  style={{ height: `${Math.max((month.revenue / monthlyRevenue.maxRevenue) * 100, month.revenue ? 8 : 0)}%` }}
                  title={`${month.label}: ${formatPrice(month.revenue)}`}
                ></div>
              </div>
              <span>{month.label.replace('Tháng ', 'T')}</span>
            </div>
          ))}
        </div>

        {monthlyRevenue.monthOrders.length === 0 ? (
          <div className="dashboard-empty">Chưa có đơn hàng trong tháng này</div>
        ) : (
          <div className="table-container monthly-table-container">
            <table className="data-table monthly-revenue-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày ghi nhận</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRevenue.monthOrders
                  .slice()
                  .sort((a, b) => new Date(getOrderDate(b)) - new Date(getOrderDate(a)))
                  .map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td className="order-items-cell">{order.items.map(i => i.title).join(', ')}</td>
                      <td className={isRevenueOrder(order) ? 'price-cell' : ''}>{formatPrice(order.total)}</td>
                      <td>
                        <span className={`badge badge-${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td>{formatDate(getOrderDate(order))}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
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
                  <th>STT</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
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

function isRevenueOrder(order) {
  return order.status === 'delivered'
}

function getOrderDate(order) {
  return order.deliveredAt || order.createdAt
}

function getCurrentMonthKey() {
  return toMonthKey(new Date())
}

function toMonthKey(dateValue) {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return ''
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-')
  return `Tháng ${Number(month)}/${year}`
}

function getMonthRevenue(orders, monthKey) {
  return orders
    .filter(order => isRevenueOrder(order) && toMonthKey(getOrderDate(order)) === monthKey)
    .reduce((sum, order) => sum + Number(order.total || 0), 0)
}
