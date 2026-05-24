import { Link } from 'react-router-dom'
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useWishlist } from '../../contexts/WishlistContext'
import { formatPrice, getDiscount } from '../../utils/helpers'
import './Wishlist.css'

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist()

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page page-enter">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">❤️</div>
            <h3 className="empty-state-title">Chưa có sách yêu thích</h3>
            <p className="empty-state-text">Hãy thêm sách vào danh sách yêu thích để xem lại sau.</p>
            <Link to="/books" className="btn btn-primary">
              <FiShoppingBag /> Khám phá sách
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page page-enter">
      <div className="container">
        <h1 className="page-title">
          <FiHeart /> Sách yêu thích ({wishlistItems.length})
        </h1>

        <div className="wishlist-grid">
          {wishlistItems.map(book => {
            const discount = getDiscount(book.price, book.originalPrice)
            return (
              <div key={book.id} className="wishlist-card card">
                <Link to={`/books/${book.id}`} className="wishlist-image">
                  <img src={book.image?.startsWith('http') ? book.image : `/${book.image}`} alt={book.title} />
                  {discount > 0 && <span className="wishlist-discount">-{discount}%</span>}
                </Link>
                <div className="wishlist-body">
                  <p className="wishlist-author">{book.author}</p>
                  <Link to={`/books/${book.id}`} className="wishlist-title">{book.title}</Link>
                  <div className="wishlist-price">
                    <span className="price">{formatPrice(book.price)}</span>
                    {discount > 0 && <span className="price-original">{formatPrice(book.originalPrice)}</span>}
                  </div>
                  <div className="wishlist-actions">
                    <Link to={`/books/${book.id}`} className="btn btn-secondary btn-sm">Xem chi tiết</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromWishlist(book.id)}>
                      <FiTrash2 /> Bỏ
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
