import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import { useAuth } from './contexts/AuthContext'

// Lazy-loaded pages (code splitting)
const Home = lazy(() => import('./pages/Home/Home'))
const Books = lazy(() => import('./pages/Books/Books'))
const BookDetail = lazy(() => import('./pages/BookDetail/BookDetail'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Checkout = lazy(() => import('./pages/Checkout/Checkout'))
const Orders = lazy(() => import('./pages/Orders/Orders'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

// Admin pages
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const AdminBooks = lazy(() => import('./pages/Admin/AdminBooks'))
const AdminCategories = lazy(() => import('./pages/Admin/AdminCategories'))
const AdminUsers = lazy(() => import('./pages/Admin/AdminUsers'))
const AdminOrders = lazy(() => import('./pages/Admin/AdminOrders'))

function PageLoader() {
  return (
    <div className="loading-container" style={{ height: '100vh' }}>
      <div className="spinner"></div>
    </div>
  )
}

function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh' }}>
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { loading } = useAuth()

  if (loading) {
    return <PageLoader />
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

      <Suspense fallback={<PageLoader />}>
        <ScrollToTop />
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/books" element={<ClientLayout><Books /></ClientLayout>} />
          <Route path="/books/:id" element={<ClientLayout><BookDetail /></ClientLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ClientLayout><Cart /></ClientLayout>} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <ClientLayout><Checkout /></ClientLayout>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <ClientLayout><Orders /></ClientLayout>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
