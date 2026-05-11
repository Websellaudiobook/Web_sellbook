import { Link } from 'react-router-dom'
import { FiShoppingCart, FiStar, FiEye } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'
import { formatPrice, getDiscount } from '../../utils/helpers'
import './BookCard.css'

export default function BookCard({ book }) {
  const { addToCart } = useCart()
  const discount = getDiscount(book.price, book.originalPrice)

  return (
    <div className="book-card card">
      <div className="book-card-image">
        <img
          src={book.image}
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
          <button onClick={() => addToCart(book)} className="overlay-btn overlay-btn-cart">
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
                className={`star ${i <= Math.round(book.rating) ? '' : 'empty'}`}
                fill={i <= Math.round(book.rating) ? '#f59e0b' : 'none'}
              />
            ))}
          </div>
          <span className="rating-count">({book.reviews})</span>
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
