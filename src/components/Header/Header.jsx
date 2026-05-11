import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiSearch, FiSettings, FiBookOpen, FiHome, FiGrid, FiClock } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import './Header.css'

export default function Header() {
  const { user, logout, isAdmin } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="header">
      <div className="header-bg"></div>
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <FiBookOpen className="logo-icon" />
          <span className="logo-text">Book<span className="logo-accent">Verse</span></span>
        </Link>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm sách, tác giả..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            <FiHome /> Trang chủ
          </Link>
          <Link to="/books" className="nav-link" onClick={() => setMenuOpen(false)}>
            <FiGrid /> Sách
          </Link>

          {user ? (
            <>
              <Link to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
                <FiShoppingCart />
                Giỏ hàng
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  className="user-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/orders" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <FiClock /> Lịch sử mua hàng
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <FiSettings /> Quản trị
                      </Link>
                    )}
                    <button onClick={() => { logout(); setUserMenuOpen(false) }} className="dropdown-item dropdown-logout">
                      <FiLogOut /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm" onClick={() => setMenuOpen(false)}>
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                Đăng ký
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  )
}
