export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

export const getDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round((1 - price / originalPrice) * 100)
}

export const getReviewStats = (reviews = []) => {
  const totalReviews = reviews.length
  const averageRating = totalReviews
    ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / totalReviews
    : 0

  return {
    averageRating,
    totalReviews
  }
}

export const enrichBooksWithReviewStats = (books = [], reviews = []) => {
  return books.map(book => {
    const bookReviews = reviews.filter(review => String(review.bookId) === String(book.id))
    const { averageRating, totalReviews } = getReviewStats(bookReviews)

    return {
      ...book,
      averageRating,
      totalReviews
    }
  })
}

export const getStatusLabel = (status) => {
  const map = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    shipping: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy'
  }
  return map[status] || status
}

export const getStatusColor = (status) => {
  const map = {
    pending: 'warning',
    confirmed: 'info',
    shipping: 'primary',
    delivered: 'success',
    cancelled: 'danger'
  }
  return map[status] || 'primary'
}
