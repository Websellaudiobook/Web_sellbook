import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiBook,
  FiCalendar,
  FiGlobe,
  FiHash,
  FiMessageSquare,
  FiEdit3,
  FiUser,
  FiTrash2
} from 'react-icons/fi'
import { getBook, getBooks, getReviewsByBook, createReview, updateReview, deleteReview, getOrders } from '../../services/api'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatPrice, getDiscount } from '../../utils/helpers'
import BookCard from '../../components/BookCard/BookCard'
import { SkeletonDetail } from '../../components/Skeleton/Skeleton'
import { toast } from 'react-toastify'
import './BookDetail.css'

const IMG_FALLBACK = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" fill="%231e1e2e"><rect width="300" height="400"/><text x="150" y="200" text-anchor="middle" fill="%23666" font-size="20">No Image</text></svg>'

export default function BookDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [book, setBook] = useState(null)
  const [relatedBooks, setRelatedBooks] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'reviews' ? 'reviews' : 'description')
  const [reviewRating, setReviewRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [canReview, setCanReview] = useState(false)
  const wishlisted = book ? isWishlisted(book.id) : false

  useEffect(() => {
    if (searchParams.get('tab') === 'reviews') {
      setActiveTab('reviews')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true)
      setQuantity(1)
      try {
        const res = await getBook(id)
        setBook(res.data)

        const reviewsRes = await getReviewsByBook(id)
        setReviews(sortReviews(reviewsRes.data))

        const categoryIds = Array.isArray(res.data.categoryId) ? res.data.categoryId : [res.data.categoryId]
        const catId = categoryIds
          .map(id => String(id))
          .find(id => id && id !== 'NaN' && id !== 'undefined' && id !== 'null')
        const allBooks = await getBooks()
        const related = allBooks.data
          .filter(b => {
            if (b.id === res.data.id) return false
            if (!catId) return false
            if (Array.isArray(b.categoryId)) return b.categoryId.map(id => String(id)).includes(catId)
            return String(b.categoryId) === catId
          })
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

  useEffect(() => {
    if (!user) {
      setReviewRating(5)
      setReviewComment('')
      setCanReview(false)
      return
    }

    const existingReview = reviews.find(review => String(review.userId) === String(user.id))
    if (existingReview) {
      setReviewRating(existingReview.rating)
      setReviewComment(existingReview.comment)
    } else {
      setReviewRating(5)
      setReviewComment('')
    }
  }, [reviews, user])

  useEffect(() => {
    const checkPurchase = async () => {
      if (!user || !id) {
        setCanReview(false)
        return
      }

      try {
        const res = await getOrders()
        const purchased = res.data.some(order =>
          String(order.userId) === String(user.id) &&
          order.status === 'delivered' &&
          order.items?.some(item => String(item.bookId || item.id) === String(id))
        )
        setCanReview(purchased)
      } catch (err) {
        setCanReview(false)
      }
    }

    checkPurchase()
  }, [id, user])

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
  const totalReviews = reviews.length
  const averageRating = totalReviews
    ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / totalReviews
    : 0
  const userReview = user
    ? reviews.find(review => String(review.userId) === String(user.id))
    : null
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(review => Number(review.rating) === star).length
  }))

  const handleWishlist = () => {
    if (!user) {
      toast.info('Vui lòng đăng nhập để lưu yêu thích')
      navigate('/login')
      return
    }
    toggleWishlist(book)
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
      toast.success('Đã sao chép link!')
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.info('Vui lòng đăng nhập để viết đánh giá')
      navigate('/login')
      return
    }

    if (!canReview) {
      toast.info('Bạn cần mua sách và nhận hàng thành công trước khi đánh giá')
      return
    }

    if (!reviewRating) {
      toast.warning('Vui lòng chọn số sao đánh giá')
      return
    }

    if (!reviewComment.trim()) {
      toast.warning('Vui lòng nhập nội dung bình luận')
      return
    }

    setSubmittingReview(true)
    try {
      const payload = {
        bookId: String(book.id),
        userId: String(user.id),
        userName: user.name || user.email || 'Người dùng',
        rating: reviewRating,
        comment: reviewComment.trim(),
        createdAt: new Date().toISOString()
      }

      if (userReview) {
        await updateReview(userReview.id, payload)
        toast.success('Cập nhật đánh giá thành công!')
      } else {
        await createReview(payload)
        toast.success('Gửi đánh giá thành công!')
      }

      const reviewsRes = await getReviewsByBook(id)
      setReviews(sortReviews(reviewsRes.data))
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra khi gửi đánh giá!')
    } finally {
      setSubmittingReview(false)
    }
  }

  const handleDeleteOwnReview = async () => {
    if (!userReview) return
    if (!window.confirm('Bạn chắc chắn muốn xóa đánh giá này?')) return

    try {
      await deleteReview(userReview.id)
      toast.success('Đã xóa đánh giá')
      setReviewRating(5)
      setReviewComment('')
      const reviewsRes = await getReviewsByBook(id)
      setReviews(sortReviews(reviewsRes.data))
    } catch (err) {
      toast.error(err.friendlyMessage || 'Không thể xóa đánh giá')
    }
  }

  const renderStars = (rating, className = '') => (
    <div className={`stars ${className}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <FiStar
          key={i}
          className={`star ${i <= Math.round(rating) ? '' : 'empty'}`}
          fill={i <= Math.round(rating) ? '#f59e0b' : 'none'}
        />
      ))}
    </div>
  )

  return (
    <div className="book-detail page-enter">
      <div className="container">
        <Link to="/books" className="back-link">
          <FiArrowLeft /> Quay lại danh sách
        </Link>

        <div className="detail-grid">
          <div className="detail-image-wrapper">
            <div className="detail-image">
              <img
                src={book.image?.startsWith('http') ? book.image : `/${book.image}`}
                alt={book.title}
                onError={(e) => { e.target.src = IMG_FALLBACK }}
              />
              {discount > 0 && <span className="detail-discount">-{discount}%</span>}
            </div>
          </div>

          <div className="detail-info">
            {book.bestseller && <span className="badge badge-warning">🔥 Best Seller</span>}
            <h1 className="detail-title">{book.title}</h1>
            <p className="detail-author">Tác giả: <strong>{book.author}</strong></p>

            <div className="detail-rating">
              {renderStars(averageRating)}
              <span>{totalReviews ? averageRating.toFixed(1) : 'Chưa có'}</span>
              <span className="rating-divider">|</span>
              <span>{totalReviews} đánh giá</span>
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
                onClick={() => {
                  if (!user) {
                    toast.info('Vui lòng đăng nhập để thêm vào giỏ hàng')
                    navigate('/login')
                    return
                  }
                  addToCart(book, quantity)
                }}
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
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá ({totalReviews})
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
            {activeTab === 'reviews' && (
              <div className="tab-pane animate-fade-in">
                <div className="reviews-panel">
                  <section className="review-summary">
                    <div className="review-score">
                      <span className="review-score-number">{totalReviews ? averageRating.toFixed(1) : '0.0'}</span>
                      <span className="review-score-max">/5</span>
                      {renderStars(averageRating, 'review-score-stars')}
                      <p>{totalReviews} đánh giá</p>
                    </div>

                    <div className="rating-breakdown">
                      {ratingCounts.map(({ star, count }) => {
                        const percent = totalReviews ? Math.round((count / totalReviews) * 100) : 0
                        return (
                          <div className="rating-row" key={star}>
                            <span>{star} sao</span>
                            <div className="rating-track">
                              <div className="rating-fill" style={{ width: `${percent}%` }} />
                            </div>
                            <span>{percent}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  <section className="review-form-section">
                    <h3><FiEdit3 /> {userReview ? 'Cập nhật đánh giá' : 'Viết đánh giá'}</h3>
                    {user && canReview ? (
                      <form className="review-form" onSubmit={handleSubmitReview}>
                        <div className="review-star-picker" onMouseLeave={() => setHoverRating(0)}>
                          <span>Chọn sao:</span>
                          <div className="review-star-buttons">
                            {[1, 2, 3, 4, 5].map(star => {
                              const active = star <= (hoverRating || reviewRating)
                              return (
                                <button
                                  type="button"
                                  key={star}
                                  className={`review-star-btn ${active ? 'active' : ''}`}
                                  onMouseEnter={() => setHoverRating(star)}
                                  onClick={() => setReviewRating(star)}
                                  aria-label={`${star} sao`}
                                >
                                  <FiStar fill={active ? '#f59e0b' : 'none'} />
                                </button>
                              )
                            })}
                          </div>
                        </div>
                        <textarea
                          className="form-textarea"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Nhập bình luận của bạn..."
                          rows={4}
                        />
                        <div className="review-form-actions">
                          {userReview && (
                            <button className="btn btn-danger" type="button" onClick={handleDeleteOwnReview}>
                              <FiTrash2 /> Xóa đánh giá
                            </button>
                          )}
                          <button className="btn btn-primary" type="submit" disabled={submittingReview}>
                            {submittingReview ? 'Đang gửi...' : userReview ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="review-login-box">
                        <p>
                          {user
                            ? 'Bạn cần mua sách và nhận hàng thành công trước khi đánh giá.'
                            : 'Vui lòng đăng nhập để viết đánh giá cho cuốn sách này.'}
                        </p>
                        {!user && (
                          <button className="btn btn-primary" onClick={() => navigate('/login')}>Đăng nhập</button>
                        )}
                      </div>
                    )}
                  </section>

                  <section className="review-list-section">
                    <h3><FiMessageSquare /> Bình luận ({totalReviews})</h3>
                    {reviews.length > 0 ? (
                      <div className="review-list">
                        {reviews.map(review => (
                          <article className="review-item" key={review.id}>
                            <div className="review-avatar"><FiUser /></div>
                            <div className="review-body">
                              <div className="review-head">
                                <div>
                                  <h4>{review.userName}</h4>
                                  {renderStars(review.rating, 'review-item-stars')}
                                </div>
                                <time>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</time>
                              </div>
                              <p>{review.comment}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state review-empty">
                        <FiMessageSquare className="review-empty-icon" />
                        <h3 className="empty-state-title">Chưa có đánh giá</h3>
                        <p className="empty-state-text">Hãy là người đầu tiên chia sẻ cảm nhận về cuốn sách này.</p>
                      </div>
                    )}
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>

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

function sortReviews(reviews) {
  return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
