import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Books from './pages/Books/Books'
import BookDetail from './pages/BookDetail/BookDetail'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'

import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import AdminBooks from './pages/Admin/AdminBooks'
import AdminCategories from './pages/Admin/AdminCategories'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminOrders from './pages/Admin/AdminOrders'

import { useAuth } from './contexts/AuthContext'

function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container" style={{ height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
        <Route path="/books" element={<ClientLayout><Books /></ClientLayout>} />
        <Route path="/books/:id" element={<ClientLayout><BookDetail /></ClientLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<ClientLayout><Cart /></ClientLayout>} />
        <Route path="/checkout" element={<ClientLayout><Checkout /></ClientLayout>} />
        <Route path="/orders" element={<ClientLayout><Orders /></ClientLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  )
}
