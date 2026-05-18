import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'
import { STORAGE_KEYS } from '../utils/constants'

const WishlistContext = createContext()

export const useWishlist = () => useContext(WishlistContext)

const getStorageKey = (userId) => `${STORAGE_KEYS.WISHLIST}_${userId}`

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    if (!user) {
      setWishlistItems([])
      return
    }
    const saved = localStorage.getItem(getStorageKey(user.id))
    if (saved) {
      try {
        setWishlistItems(JSON.parse(saved))
      } catch {
        localStorage.removeItem(getStorageKey(user.id))
        setWishlistItems([])
      }
    } else {
      setWishlistItems([])
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(wishlistItems))
  }, [wishlistItems, user])

  const addToWishlist = (book) => {
    setWishlistItems(prev => {
      if (prev.some(item => String(item.id) === String(book.id))) return prev
      return [...prev, book]
    })
    toast.success('Đã thêm vào yêu thích!')
  }

  const removeFromWishlist = (bookId) => {
    setWishlistItems(prev => prev.filter(item => String(item.id) !== String(bookId)))
    toast.info('Đã bỏ yêu thích')
  }

  const toggleWishlist = (book) => {
    const exists = wishlistItems.some(item => String(item.id) === String(book.id))
    if (exists) {
      removeFromWishlist(book.id)
      return false
    }
    addToWishlist(book)
    return true
  }

  const isWishlisted = (bookId) => wishlistItems.some(item => String(item.id) === String(bookId))

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}
