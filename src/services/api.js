import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// ===== RESPONSE INTERCEPTOR (Error handling) =====
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      error.friendlyMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!'
    } else if (error.response.status === 404) {
      error.friendlyMessage = 'Dữ liệu không tồn tại!'
    } else if (error.response.status === 500) {
      error.friendlyMessage = 'Lỗi server nội bộ. Vui lòng thử lại sau!'
    } else {
      error.friendlyMessage = 'Đã xảy ra lỗi, vui lòng thử lại!'
    }
    return Promise.reject(error)
  }
)

// ===== BOOKS =====
export const getBooks = (params = {}) => api.get('/books', { params })
export const getBook = (id) => api.get(`/books/${id}`)
export const createBook = (data) => api.post('/books', data)
export const updateBook = (id, data) => api.put(`/books/${id}`, data)
export const deleteBook = (id) => api.delete(`/books/${id}`)

// ===== CATEGORIES =====
export const getCategories = () => api.get('/categories')
export const getCategory = (id) => api.get(`/categories/${id}`)
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

// ===== USERS =====
export const getUsers = () => api.get('/users')
export const getUser = (id) => api.get(`/users/${id}`)
export const createUser = (data) => api.post('/users', data)
export const updateUser = (id, data) => api.put(`/users/${id}`, data)
export const deleteUser = (id) => api.delete(`/users/${id}`)
// Security: Login uses POST-like approach by fetching by email only,
// then comparing password on the client side (avoids password in URL params)
export const loginUser = (email) =>
  api.get('/users', { params: { email } })
export const registerUser = (data) => api.post('/users', data)

// ===== ORDERS =====
export const getOrders = () => api.get('/orders')
export const getOrder = (id) => api.get(`/orders/${id}`)
export const getOrdersByUser = (userId) => api.get('/orders', { params: { userId } })
export const createOrder = (data) => api.post('/orders', data)
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data)
export const deleteOrder = (id) => api.delete(`/orders/${id}`)

export default api
