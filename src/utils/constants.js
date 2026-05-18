// ===== SHIPPING =====
export const SHIPPING_FEE = 30000
export const FREE_SHIPPING_THRESHOLD = 300000

// ===== PAGINATION =====
export const BOOKS_PER_PAGE = 12

// ===== ORDER STATUSES =====
export const ORDER_STATUSES = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled']

// ===== PAYMENT METHODS =====
export const PAYMENT_METHODS = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
  { value: 'banking', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
  { value: 'momo', label: 'Ví MoMo', icon: '📱' }
]

// ===== SORT OPTIONS =====
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá: Thấp → Cao' },
  { value: 'price-desc', label: 'Giá: Cao → Thấp' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'name', label: 'A → Z' }
]

// ===== PRICE RANGES =====
export const PRICE_RANGES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'under100', label: 'Dưới 100.000đ' },
  { value: '100to200', label: '100.000đ - 200.000đ' },
  { value: 'over200', label: 'Trên 200.000đ' }
]

// ===== LOCAL STORAGE KEYS =====
export const STORAGE_KEYS = {
  USER: 'bookstore_user',
  CART: 'bookstore_cart',
  WISHLIST: 'bookstore_wishlist'
}
