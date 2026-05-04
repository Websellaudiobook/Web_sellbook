import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { FiBook, FiUsers, FiGrid, FiShoppingBag, FiHome, FiBarChart2, FiSettings } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import './Admin.css'

export default function AdminLayout() {
  const { user, isAdmin } = useAuth()

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <FiSettings className="admin-logo-icon" />
          <div>
            <h3>Admin Panel</h3>
            <p>BookVerse</p>
          </div>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-section">
            <span className="admin-nav-label">Tổng quan</span>
            <NavLink to="/admin" end className="admin-nav-link">
              <FiBarChart2 /> Dashboard
            </NavLink>
          </div>

          <div className="admin-nav-section">
            <span className="admin-nav-label">Quản lý</span>
            <NavLink to="/admin/books" className="admin-nav-link">
              <FiBook /> Sách
            </NavLink>
            <NavLink to="/admin/categories" className="admin-nav-link">
              <FiGrid /> Danh mục
            </NavLink>
            <NavLink to="/admin/orders" className="admin-nav-link">
              <FiShoppingBag /> Đơn hàng
            </NavLink>
            <NavLink to="/admin/users" className="admin-nav-link">
              <FiUsers /> Tài khoản
            </NavLink>
          </div>

          <div className="admin-nav-section">
            <NavLink to="/" className="admin-nav-link">
              <FiHome /> Về trang chủ
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
