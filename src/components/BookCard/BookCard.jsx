import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiStar, FiEye } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatPrice, getDiscount } from '../../utils/helpers'
import { toast } from 'react-toastify'
import './BookCard.css'

export default function BookCard({ book }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const discount = getDiscount(book.price, book.originalPrice)
  const averageRating = Number(book.averageRating || 0)
  const totalReviews = Number(book.totalReviews || 0)

  return (
    <div className="book-card card">
      <div className="book-card-image">
        <img
          src={book.image?.startsWith('http') ? book.image : `/${book.image}`}
          alt={book.title}
          loading="lazy"
          onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" fill="%231e1e2e"><rect width="300" height="400"/><text x="150" y="200" text-anchor="middle" fill="%23666" font-size="16">No Image</text></svg>' }}
        />
        {discount > 0 && (
          <span className="book-discount">-{discount}%</span>
        )}
        {book.bestseller && (
          <span className="book-bestseller">Best Seller</span>
        )}
        <div className="book-card-overlay">
          <Link to={`/books/${book.id}`} className="overlay-btn">
            <FiEye /> Xem chi tiết
          </Link>
          <button
            onClick={() => {
              if (!user) {
                toast.info('Vui lòng đăng nhập để thêm vào giỏ hàng')
                navigate('/login')
                return
              }
              addToCart(book)
            }}
            className="overlay-btn overlay-btn-cart"
          >
            <FiShoppingCart /> Thêm vào giỏ
          </button>
        </div>
      </div>
      <div className="book-card-body">
        <p className="book-card-author">{book.author}</p>
        <Link to={`/books/${book.id}`} className="book-card-title">
          {book.title}
        </Link>
        <div className="book-card-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map(i => (
              <FiStar
                key={i}
                className={`star ${i <= Math.round(averageRating) ? '' : 'empty'}`}
                fill={i <= Math.round(averageRating) ? '#f59e0b' : 'none'}
              />
            ))}
          </div>
          <span className="rating-count">({totalReviews})</span>
        </div>
        <div className="book-card-price">
          <span className="price">{formatPrice(book.price)}</span>
          {discount > 0 && (
            <span className="price-original">{formatPrice(book.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
