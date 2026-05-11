import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FiBook, FiUsers, FiGrid, FiShoppingBag, FiHome, FiBarChart2, FiSettings, FiMenu, FiX, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import './Admin.css'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="admin-layout">
      {/* Mobile sidebar toggle */}
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar-open' : ''}`}>
        <div className="admin-sidebar-header">
          <FiSettings className="admin-logo-icon" />
          <div>
            <h3>Admin Panel</h3>
            <p>BookVerse</p>
          </div>
        </div>

        <nav className="admin-nav" onClick={() => setSidebarOpen(false)}>
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
            <button className="admin-nav-link" onClick={handleLogout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
              <FiLogOut /> Đăng xuất
            </button>
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
