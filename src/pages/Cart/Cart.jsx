import { Link } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatPrice } from '../../utils/helpers'
import './Cart.css'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const { user } = useAuth()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page page-enter">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h3 className="empty-state-title">Giỏ hàng trống</h3>
            <p className="empty-state-text">Hãy thêm sách vào giỏ hàng để bắt đầu mua sắm!</p>
            <Link to="/books" className="btn btn-primary">
              <FiShoppingBag /> Mua sắm ngay
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <h1 className="page-title">
          <FiShoppingCart /> Giỏ hàng ({cartItems.length} sản phẩm)
        </h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item card">
                <Link to={`/books/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/books/${item.id}`} className="cart-item-title">{item.title}</Link>
                  <p className="cart-item-author">{item.author}</p>
                  <div className="cart-item-bottom">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
                    </div>
                    <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card card">
              <h3 className="summary-title">Tóm tắt đơn hàng</h3>
              <div className="summary-row">
                <span>Tạm tính</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span>{cartTotal >= 300000 ? 'Miễn phí' : formatPrice(30000)}</span>
              </div>
              {cartTotal < 300000 && (
                <div className="summary-note">
                  Mua thêm {formatPrice(300000 - cartTotal)} để được miễn phí ship
                </div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Tổng cộng</span>
                <span>{formatPrice(cartTotal + (cartTotal >= 300000 ? 0 : 30000))}</span>
              </div>
              {user ? (
                <Link to="/checkout" className="btn btn-primary btn-lg summary-btn">
                  Tiến hành thanh toán <FiArrowRight />
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary btn-lg summary-btn">
                  Đăng nhập để thanh toán
                </Link>
              )}
              <Link to="/books" className="btn btn-secondary summary-btn">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
