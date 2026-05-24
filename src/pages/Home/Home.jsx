import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiStar } from 'react-icons/fi'
import { getBooks, getCategories, getSubscribers, createSubscriber, getReviews } from '../../services/api'
import { enrichBooksWithReviewStats } from '../../utils/helpers'
import BookCard from '../../components/BookCard/BookCard'
import { toast } from 'react-toastify'
import './Home.css'

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [bestsellerBooks, setBestsellerBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, catsRes, reviewsRes] = await Promise.all([
          getBooks(),
          getCategories(),
          getReviews()
        ])
        const books = enrichBooksWithReviewStats(booksRes.data, reviewsRes.data)
        setFeaturedBooks(books.filter(b => b.featured).sort(sortByRealReviews).slice(0, 4))
        setBestsellerBooks(books.filter(b => b.bestseller).sort(sortByRealReviews).slice(0, 4))
        setCategories(catsRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="home page-enter">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">📚 Nhà sách trực tuyến #1 Việt Nam</span>
            <h1 className="hero-title">
              Khám phá thế giới
              <span className="hero-gradient"> tri thức </span>
              cùng BookVerse
            </h1>
            <p className="hero-desc">
              Hàng ngàn đầu sách chất lượng với giá ưu đãi. Miễn phí giao hàng cho đơn từ 300.000đ. Đổi trả dễ dàng trong 30 ngày.
            </p>
            <div className="hero-actions">
              <Link to="/books?featured=true" className="btn btn-primary btn-lg">
                Khám phá ngay <FiArrowRight />
              </Link>
              <Link to="/books?bestseller=true" className="btn btn-secondary btn-lg">
                Sách bán chạy
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">10,000+</span>
                <span className="hero-stat-label">Đầu sách</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">50,000+</span>
                <span className="hero-stat-label">Khách hàng</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">4.9</span>
                <span className="hero-stat-label">Đánh giá</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-book-stack">
              <div className="hero-book hero-book-1">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300" alt="book" />
              </div>
              <div className="hero-book hero-book-2">
                <img src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300" alt="book" />
              </div>
              <div className="hero-book hero-book-3">
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300" alt="book" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FiTruck /></div>
              <h3>Miễn phí giao hàng</h3>
              <p>Đơn hàng từ 300.000đ</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FiShield /></div>
              <h3>Sách chính hãng</h3>
              <p>Đảm bảo 100% chính hãng</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FiRefreshCw /></div>
              <h3>Đổi trả dễ dàng</h3>
              <p>Trong vòng 30 ngày</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FiHeadphones /></div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Luôn sẵn sàng hỗ trợ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Danh mục sách</h2>
              <p className="section-subtitle">Khám phá sách theo chủ đề yêu thích</p>
            </div>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link
                to={`/books?categoryId=${cat.id}`}
                key={cat.id}
                className="category-card"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="category-image">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <div className="category-info">
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">✨ Sách nổi bật</h2>
              <p className="section-subtitle">Được đề xuất bởi đội ngũ BookVerse</p>
            </div>
            <Link to="/books?featured=true" className="btn btn-secondary">
              Xem tất cả <FiArrowRight />
            </Link>
          </div>
          <div className="books-grid">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">🔥 Bán chạy nhất</h2>
              <p className="section-subtitle">Những cuốn sách được yêu thích nhất</p>
            </div>
            <Link to="/books?bestseller=true" className="btn btn-secondary">
              Xem tất cả <FiArrowRight />
            </Link>
          </div>
          <div className="books-grid">
            {bestsellerBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h2>📬 Đăng ký nhận tin</h2>
              <p>Nhận thông báo sách mới và ưu đãi đặc biệt</p>
              <form className="newsletter-form" onSubmit={async (e) => {
                e.preventDefault()
                const input = e.target.querySelector('input')
                const email = input?.value?.trim()
                if (!email) {
                  toast.error('Vui lòng nhập email!')
                  return
                }
                try {
                  const res = await getSubscribers()
                  const exists = res.data.some(s => s.email?.toLowerCase() === email.toLowerCase())
                  if (exists) {
                    toast.info('Email này đã đăng ký nhận tin')
                    return
                  }
                  await createSubscriber({ email, createdAt: new Date().toISOString() })
                  toast.success('Đăng ký nhận tin thành công!')
                  if (input) input.value = ''
                } catch (err) {
                  toast.error(err.friendlyMessage || 'Đăng ký thất bại')
                }
              }}>
                <input type="email" placeholder="Email của bạn..." className="form-input" />
                <button type="submit" className="btn btn-primary">Đăng ký</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function sortByRealReviews(a, b) {
  if (b.totalReviews !== a.totalReviews) return b.totalReviews - a.totalReviews
  return b.averageRating - a.averageRating
}
