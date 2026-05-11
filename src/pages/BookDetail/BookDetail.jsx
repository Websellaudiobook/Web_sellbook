import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiMinus, FiPlus, FiArrowLeft, FiBook, FiCalendar, FiGlobe, FiHash } from 'react-icons/fi'
import { getBook, getBooks } from '../../services/api'
import { useCart } from '../../contexts/CartContext'
import { formatPrice, getDiscount } from '../../utils/helpers'
import BookCard from '../../components/BookCard/BookCard'
import { SkeletonDetail } from '../../components/Skeleton/Skeleton'
import { toast } from 'react-toastify'
import './BookDetail.css'

const IMG_FALLBACK = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" fill="%231e1e2e"><rect width="300" height="400"/><text x="150" y="200" text-anchor="middle" fill="%23666" font-size="20">No Image</text></svg>'

export default function BookDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [book, setBook] = useState(null)
  const [relatedBooks, setRelatedBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true)
      setQuantity(1)
      try {
        const res = await getBook(id)
        setBook(res.data)
        // Optimized: fetch only books in same category instead of ALL books
        const allBooks = await getBooks({ categoryId: res.data.categoryId })
        const related = allBooks.data
          .filter(b => b.id !== res.data.id)
          .slice(0, 4)
        setRelatedBooks(related)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  if (loading) {
    return <SkeletonDetail />
  }

  if (!book) {
    return (
      <div className="empty-state" style={{ paddingTop: '120px' }}>
        <div className="empty-state-icon">📚</div>
        <h3 className="empty-state-title">Không tìm thấy sách</h3>
        <p className="empty-state-text">Sách này không tồn tại hoặc đã bị xóa</p>
        <Link to="/books" className="btn btn-primary">Quay lại</Link>
      </div>
    )
  }

  const discount = getDiscount(book.price, book.originalPrice)

  const handleWishlist = () => {
    setWishlisted(!wishlisted)
    if (!wishlisted) {
      toast.success('Đã thêm vào yêu thích! ❤️')
    } else {
      toast.info('Đã bỏ yêu thích')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Xem "${book.title}" trên BookVerse`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Đã sao chép link! 🔗')
    }
  }

  return (
    <div className="book-detail page-enter">
      <div className="container">
        <Link to="/books" className="back-link">
          <FiArrowLeft /> Quay lại danh sách
        </Link>

        <div className="detail-grid">
          {/* Image */}
          <div className="detail-image-wrapper">
            <div className="detail-image">
              <img
                src={book.image}
                alt={book.title}
                onError={(e) => { e.target.src = IMG_FALLBACK }}
              />
              {discount > 0 && <span className="detail-discount">-{discount}%</span>}
            </div>
          </div>

          {/* Info */}
          <div className="detail-info">
            {book.bestseller && <span className="badge badge-warning">🔥 Best Seller</span>}
            <h1 className="detail-title">{book.title}</h1>
            <p className="detail-author">Tác giả: <strong>{book.author}</strong></p>

            <div className="detail-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(i => (
                  <FiStar
                    key={i}
                    className={`star ${i <= Math.round(book.rating) ? '' : 'empty'}`}
                    fill={i <= Math.round(book.rating) ? '#f59e0b' : 'none'}
                  />
                ))}
              </div>
              <span>{book.rating}</span>
              <span className="rating-divider">|</span>
              <span>{book.reviews} đánh giá</span>
            </div>

            <div className="detail-price-box">
              <span className="detail-price">{formatPrice(book.price)}</span>
              {discount > 0 && (
                <>
                  <span className="price-original">{formatPrice(book.originalPrice)}</span>
                  <span className="discount-badge">Tiết kiệm {formatPrice(book.originalPrice - book.price)}</span>
                </>
              )}
            </div>

            <div className="detail-meta">
              <div className="meta-item"><FiBook /> <span>NXB: {book.publisher}</span></div>
              <div className="meta-item"><FiCalendar /> <span>Năm: {book.publishYear}</span></div>
              <div className="meta-item"><FiGlobe /> <span>{book.language}</span></div>
              <div className="meta-item"><FiHash /> <span>{book.pages} trang</span></div>
            </div>

            <div className="detail-stock">
              {book.stock > 0 ? (
                <span className="badge badge-success">✓ Còn {book.stock} sản phẩm</span>
              ) : (
                <span className="badge badge-danger">Hết hàng</span>
              )}
            </div>

            <div className="detail-actions">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}><FiPlus /></button>
              </div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => addToCart(book, quantity)}
                disabled={book.stock === 0}
              >
                <FiShoppingCart /> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="detail-share">
              <button
                className={`btn btn-sm ${wishlisted ? 'btn-wishlist-active' : 'btn-secondary'}`}
                onClick={handleWishlist}
              >
                <FiHeart /> {wishlisted ? 'Đã yêu thích' : 'Yêu thích'}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleShare}>
                <FiShare2 /> Chia sẻ
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Mô tả sách
            </button>
            <button
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Thông tin chi tiết
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane animate-fade-in">
                <p>{book.description}</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="tab-pane animate-fade-in">
                <table className="detail-spec-table">
                  <tbody>
                    <tr><td>ISBN</td><td>{book.isbn}</td></tr>
                    <tr><td>Nhà xuất bản</td><td>{book.publisher}</td></tr>
                    <tr><td>Năm xuất bản</td><td>{book.publishYear}</td></tr>
                    <tr><td>Số trang</td><td>{book.pages}</td></tr>
                    <tr><td>Ngôn ngữ</td><td>{book.language}</td></tr>
                    <tr><td>Tác giả</td><td>{book.author}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {relatedBooks.length > 0 && (
          <div className="related-section">
            <h2 className="section-title">Sách liên quan</h2>
            <div className="related-grid">
              {relatedBooks.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
