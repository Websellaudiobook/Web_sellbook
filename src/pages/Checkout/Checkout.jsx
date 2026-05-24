import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { FiMapPin, FiPhone, FiCreditCard, FiTruck, FiCheck } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { createOrder, getBook, updateBook, getDiscounts } from '../../services/api'
import { formatPrice } from '../../utils/helpers'
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, PAYMENT_METHODS, STORAGE_KEYS } from '../../utils/constants'
import { toast } from 'react-toastify'
import './Checkout.css'

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [discountInfo, setDiscountInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKOUT_DISCOUNT)) || null
    } catch {
      localStorage.removeItem(STORAGE_KEYS.CHECKOUT_DISCOUNT)
      return null
    }
  })
  const [form, setForm] = useState({
    address: user?.address || '',
    phone: user?.phone || '',
    paymentMethod: 'cod',
    note: ''
  })

  const discountPercent = Number(discountInfo?.percent || 0)
  const discountAmount = Math.round(cartTotal * discountPercent / 100)
  const subtotalAfterDiscount = Math.max(0, cartTotal - discountAmount)
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotalAfterDiscount + shipping

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validateCheckoutDiscount = async () => {
    if (!discountInfo?.code) return null

    const res = await getDiscounts()
    const match = res.data.find(d => String(d.code || '').toUpperCase() === String(discountInfo.code).toUpperCase())
    const isExpired = match?.expiresAt ? new Date(match.expiresAt) < new Date() : false
    if (!match || match.active === false || isExpired) {
      localStorage.removeItem(STORAGE_KEYS.CHECKOUT_DISCOUNT)
      setDiscountInfo(null)
      toast.error('Mã giảm giá không còn hợp lệ. Vui lòng kiểm tra lại tổng tiền.')
      return false
    }

    const normalized = { code: match.code, percent: Number(match.percent) || 0 }
    setDiscountInfo(normalized)
    return normalized
  }

  const rollbackStock = async (updatedBooks) => {
    await Promise.allSettled(
      updatedBooks.map(({ book, quantity }) =>
        updateBook(book.id, {
          ...book,
          stock: Number(book.stock || 0) + Number(quantity || 0)
        })
      )
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.address || !form.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng!')
      return
    }

    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/
    if (!phoneRegex.test(form.phone.trim())) {
      toast.error('Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.')
      return
    }

    setLoading(true)
    const updatedBooks = []
    try {
      const validDiscount = await validateCheckoutDiscount()
      if (validDiscount === false) return

      const activeDiscountPercent = Number(validDiscount?.percent || discountPercent || 0)
      const activeDiscountAmount = Math.round(cartTotal * activeDiscountPercent / 100)
      const activeSubtotalAfterDiscount = Math.max(0, cartTotal - activeDiscountAmount)
      const activeTotal = activeSubtotalAfterDiscount + shipping

      const latestBooks = await Promise.all(
        cartItems.map(async item => {
          const res = await getBook(item.id)
          return res.data
        })
      )

      const stockErrors = cartItems
        .map(item => {
          const latestBook = latestBooks.find(book => String(book.id) === String(item.id))
          const currentStock = Number(latestBook?.stock || 0)
          if (currentStock < item.quantity) {
            return `"${item.title}" chỉ còn ${currentStock} sản phẩm`
          }
          return null
        })
        .filter(Boolean)

      if (stockErrors.length > 0) {
        toast.error(stockErrors.join(', '))
        return
      }

      for (const item of cartItems) {
        const latestBook = latestBooks.find(book => String(book.id) === String(item.id))
        await updateBook(latestBook.id, {
          ...latestBook,
          stock: Math.max(0, Number(latestBook.stock || 0) - Number(item.quantity || 0))
        })
        updatedBooks.push({ book: latestBook, quantity: item.quantity })
      }

      const order = {
        userId: user.id,
        items: cartItems.map(item => ({
          bookId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: cartTotal,
        discountCode: validDiscount?.code || null,
        discountPercent: activeDiscountPercent,
        discountAmount: activeDiscountAmount,
        shippingFee: shipping,
        total: activeTotal,
        status: 'pending',
        shippingAddress: form.address,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
        note: form.note,
        createdAt: new Date().toISOString()
      }

      try {
        await createOrder(order)
      } catch (err) {
        await rollbackStock(updatedBooks)
        throw err
      }

      clearCart()
      setIsSuccess(true)
    } catch (err) {
      toast.error(err.friendlyMessage || 'Đặt hàng thất bại, vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && !isSuccess) {
    return <Navigate to="/cart" replace />
  }

  if (isSuccess) {
    return (
      <div className="checkout-page page-enter">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img src="/favicon.svg" alt="BookVerse Logo" style={{ width: '100px', height: '100px' }} />
          </div>
          <h2 style={{ marginBottom: '15px' }}>Đặt hàng thành công!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '16px' }}>
            Cảm ơn bạn đã mua sắm tại BookVerse. Đơn hàng của bạn đang được xử lý.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/orders')}>Xem đơn hàng của bạn</button>
            <button className="btn btn-secondary" onClick={() => navigate('/books')}>Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page page-enter">
      <div className="container">
        <h1 className="page-title">
          <FiCreditCard /> Thanh toán
        </h1>

        <form onSubmit={handleSubmit} className="checkout-layout">
          <div className="checkout-form">
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
              {discountInfo?.code && (
                <div className="summary-row">
                  <span>Mã giảm giá ({discountInfo.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
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
