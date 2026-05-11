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
    setCartItems(prev => {
      const existing = prev.find(item => item.id === book.id)
      if (existing) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...book, quantity }]
    })
    toast.success(`Đã thêm "${book.title}" vào giỏ hàng`)
  }

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item.id !== bookId))
    toast.info('Đã xóa sản phẩm khỏi giỏ hàng')
  }

  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) {
      removeFromCart(bookId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
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
