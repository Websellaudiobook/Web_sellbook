import { Link } from 'react-router-dom'
import { FiHome, FiBookOpen } from 'react-icons/fi'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-bg">
        <div className="notfound-orb notfound-orb-1"></div>
        <div className="notfound-orb notfound-orb-2"></div>
      </div>
      <div className="notfound-content animate-scale">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Trang không tồn tại</h1>
        <p className="notfound-desc">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <FiHome /> Về trang chủ
          </Link>
          <Link to="/books" className="btn btn-secondary btn-lg">
            <FiBookOpen /> Xem sách
          </Link>
        </div>
      </div>
    </div>
  )
}
