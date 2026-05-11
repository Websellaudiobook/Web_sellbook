import { Link } from 'react-router-dom'
import { FiBookOpen, FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FiBookOpen className="footer-logo-icon" />
              <span>Book<span className="logo-accent">Verse</span></span>
            </Link>
            <p className="footer-desc">
              Nhà sách trực tuyến hàng đầu Việt Nam. Hàng ngàn đầu sách chất lượng với giá ưu đãi nhất.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link"><FiFacebook /></a>
              <a href="#" className="social-link"><FiInstagram /></a>
              <a href="#" className="social-link"><FiTwitter /></a>
              <a href="#" className="social-link"><FiYoutube /></a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4 className="footer-title">Danh mục</h4>
            <Link to="/books?categoryId=1" className="footer-link">Văn học</Link>
            <Link to="/books?categoryId=2" className="footer-link">Kinh tế</Link>
            <Link to="/books?categoryId=3" className="footer-link">Khoa học</Link>
            <Link to="/books?categoryId=4" className="footer-link">Công nghệ</Link>
            <Link to="/books?categoryId=5" className="footer-link">Tâm lý</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Hỗ trợ</h4>
            <a href="#" className="footer-link">Chính sách đổi trả</a>
            <a href="#" className="footer-link">Chính sách bảo mật</a>
            <a href="#" className="footer-link">Điều khoản sử dụng</a>
            <a href="#" className="footer-link">Hướng dẫn mua hàng</a>
            <a href="#" className="footer-link">Phương thức thanh toán</a>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-title">Liên hệ</h4>
            <div className="footer-contact">
              <FiMapPin /> <span>Thăng Long University, Hoàng Mai, Hà Nội</span>
            </div>
            <div className="footer-contact">
              <FiPhone /> <span>0326666666</span>
            </div>
            <div className="footer-contact">
              <FiMail /> <span>contact@bookverse.vn</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 BookVerse. All rights reserved. Made with ❤️ in Vietnam.</p>
        </div>
      </div>
    </footer>
  )
}
