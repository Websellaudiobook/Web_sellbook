import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { FiMapPin, FiPhone, FiCreditCard, FiTruck, FiCheck } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { createOrder } from '../../services/api'
import { formatPrice } from '../../utils/helpers'
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, PAYMENT_METHODS } from '../../utils/constants'
import { toast } from 'react-toastify'
import './Checkout.css'

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    address: user?.address || '',
    phone: user?.phone || '',
    paymentMethod: 'cod',
    note: ''
  })

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = cartTotal + shipping

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.address || !form.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng!')
      return
    }

    setLoading(true)
    try {
      const order = {
        userId: user.id,
        items: cartItems.map(item => ({
          bookId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        total: total,
        status: 'pending',
        shippingAddress: form.address,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
        note: form.note,
        createdAt: new Date().toISOString()
      }
      await createOrder(order)
      clearCart()
      toast.success('Đặt hàng thành công! 🎉')
      navigate('/orders')
    } catch (err) {
      toast.error('Đặt hàng thất bại, vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  // Fix: Use Navigate component instead of calling navigate() during render
  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <div className="checkout-page page-enter">
      <div className="container">
        <h1 className="page-title">
          <FiCreditCard /> Thanh toán
        </h1>

        <form onSubmit={handleSubmit} className="checkout-layout">
          <div className="checkout-form">
            {/* Shipping Info */}
            <div className="checkout-section card">
              <h3><FiTruck /> Thông tin giao hàng</h3>

              <div className="form-group">
                <label className="form-label">Địa chỉ giao hàng *</label>
                <div className="input-icon">
                  <FiMapPin className="input-icon-left" />
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    style={{ paddingLeft: '42px' }}
                    placeholder="Số nhà, đường, quận, thành phố"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại *</label>
                <div className="input-icon">
                  <FiPhone className="input-icon-left" />
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    style={{ paddingLeft: '42px' }}
                    placeholder="0901234567"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ghi chú</label>
                <textarea
                  name="note"
                  className="form-textarea"
                  placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                  value={form.note}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section card">
              <h3><FiCreditCard /> Phương thức thanh toán</h3>
              <div className="payment-options">
                {PAYMENT_METHODS.map(opt => (
                  <label
                    key={opt.value}
                    className={`payment-option ${form.paymentMethod === opt.value ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={form.paymentMethod === opt.value}
                      onChange={handleChange}
                    />
                    <span className="payment-icon">{opt.icon}</span>
                    <span>{opt.label}</span>
                    {form.paymentMethod === opt.value && <FiCheck className="payment-check" />}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <div className="summary-card card">
              <h3 className="summary-title">Đơn hàng của bạn</h3>
              <div className="checkout-items">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-item">
                    <img src={item.image?.startsWith('http') ? item.image : `/${item.image}`} alt={item.title} />
                    <div className="checkout-item-info">
                      <p className="checkout-item-title">{item.title}</p>
                      <p className="checkout-item-qty">x{item.quantity}</p>
                    </div>
                    <span className="checkout-item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row">
                <span>Tạm tính</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button type="submit" className="btn btn-primary btn-lg summary-btn" disabled={loading}>
                {loading ? 'Đang xử lý...' : `Đặt hàng • ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
