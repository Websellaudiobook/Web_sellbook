import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { getDiscounts } from '../../services/api'
import { formatPrice } from '../../utils/helpers'
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, STORAGE_KEYS } from '../../utils/constants'
import { toast } from 'react-toastify'
import './Cart.css'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const { user } = useAuth()
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountPercent, setDiscountPercent] = useState(0)

  const handleApplyDiscount = async () => {
    const code = discountCode.trim().toUpperCase()
    if (!code) return
    try {
      const res = await getDiscounts()
      const match = res.data.find(d => String(d.code || '').toUpperCase() === code)
      const isExpired = match?.expiresAt ? new Date(match.expiresAt) < new Date() : false
      if (!match || match.active === false || isExpired) {
        toast.error('Mã giảm giá không hợp lệ hoặc đã hết hạn!')
        setDiscountApplied(false)
        setDiscountPercent(0)
        localStorage.removeItem(STORAGE_KEYS.CHECKOUT_DISCOUNT)
        return
      }
      const percent = Number(match.percent) || 0
      setDiscountApplied(true)
      setDiscountPercent(percent)
      localStorage.setItem(STORAGE_KEYS.CHECKOUT_DISCOUNT, JSON.stringify({
        code: match.code,
        percent,
        appliedAt: new Date().toISOString()
      }))
      toast.success('Áp dụng mã giảm giá thành công!')
    } catch (err) {
      toast.error(err.friendlyMessage || 'Không thể áp dụng mã giảm giá')
    }
  }

  const finalTotal = discountApplied ? cartTotal * (1 - discountPercent / 100) : cartTotal

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
                  <img src={item.image?.startsWith('http') ? item.image : `/${item.image}`} alt={item.title} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/books/${item.id}`} className="cart-item-title">{item.title}</Link>
                  <p className="cart-item-author">{item.author}</p>
                  <div className="cart-item-bottom">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        title={item.quantity >= item.stock ? 'Đã đạt số lượng tối đa trong kho' : ''}
                      ><FiPlus /></button>
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
                <span>{cartTotal >= FREE_SHIPPING_THRESHOLD ? 'Miễn phí' : formatPrice(SHIPPING_FEE)}</span>
              </div>
              {cartTotal < FREE_SHIPPING_THRESHOLD && (
                <div className="summary-note">
                  Mua thêm {formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)} để được miễn phí ship
                </div>
              )}
              
              <div className="summary-discount" style={{ marginTop: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Mã giảm giá (VD: BOOKVERSE10)" 
                    className="form-input" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    disabled={discountApplied}
                    style={{ flex: 1 }}
                  />
                  <button 
                    className="btn btn-secondary" 
                    onClick={handleApplyDiscount}
                    disabled={discountApplied}
                    style={{ padding: '0 15px' }}
                  >
                    Áp dụng
                  </button>
                </div>
                {discountApplied && (
                  <p style={{ color: 'var(--success-color)', fontSize: '14px', marginTop: '8px' }}>
                    Đã giảm {discountPercent}% trên tổng giá trị sách
                  </p>
                )}
              </div>

              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Tổng cộng</span>
                <span>{formatPrice(finalTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE))}</span>
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
