import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { STORAGE_KEYS } from '../utils/constants'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART)
    if (saved) {
      try {
        setCartItems(JSON.parse(saved))
      } catch {
        localStorage.removeItem(STORAGE_KEYS.CART)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (book, quantity = 1) => {
    const stock = Number(book.stock || 0)
    if (stock <= 0) {
      toast.error('Sản phẩm đã hết hàng')
      return
    }

    setCartItems(prev => {
      const existing = prev.find(item => String(item.id) === String(book.id))
      if (existing) {
        const requestedQuantity = existing.quantity + quantity
        const nextQuantity = Math.min(stock, requestedQuantity)
        if (nextQuantity < requestedQuantity) {
          toast.info('Số lượng trong giỏ đã đạt tối đa theo tồn kho')
        }
        return prev.map(item =>
          String(item.id) === String(book.id)
            ? { ...item, ...book, quantity: nextQuantity }
            : item
        )
      }

      const initialQuantity = Math.min(stock, quantity)
      if (initialQuantity < quantity) {
        toast.info('Số lượng trong giỏ đã đạt tối đa theo tồn kho')
      }
      return [...prev, { ...book, quantity: initialQuantity }]
    })
    toast.success(`Đã thêm "${book.title}" vào giỏ hàng`)
  }

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => String(item.id) !== String(bookId)))
    toast.info('Đã xóa sản phẩm khỏi giỏ hàng')
  }

  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) {
      removeFromCart(bookId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        String(item.id) === String(bookId)
          ? { ...item, quantity: Math.min(quantity, Number(item.stock || quantity)) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem(STORAGE_KEYS.CHECKOUT_DISCOUNT)
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
