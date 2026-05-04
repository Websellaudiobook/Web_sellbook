import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi'
import { getBooks, getCategories } from '../../services/api'
import BookCard from '../../components/BookCard/BookCard'
import './Books.css'

export default function Books() {
  const [searchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoryId') || '')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, catsRes] = await Promise.all([getBooks(), getCategories()])
        setBooks(booksRes.data)
        setCategories(catsRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
    setSelectedCategory(searchParams.get('categoryId') || '')
  }, [searchParams])

  const filteredBooks = books
    .filter(book => {
      if (search) {
        const q = search.toLowerCase()
        return book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
      }
      return true
    })
    .filter(book => {
      if (selectedCategory) return book.categoryId === parseInt(selectedCategory)
      return true
    })
    .filter(book => {
      if (priceRange === 'under100') return book.price < 100000
      if (priceRange === '100to200') return book.price >= 100000 && book.price <= 200000
      if (priceRange === 'over200') return book.price > 200000
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'name') return a.title.localeCompare(b.title)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>
  }

  return (
    <div className="books-page page-enter">
      <div className="container">
        <div className="books-header">
          <h1>Tất cả sách</h1>
          <p>Khám phá {books.length} đầu sách chất lượng</p>
        </div>

        <div className="books-layout">
          {/* Sidebar Filters */}
          <aside className="books-sidebar">
            <div className="filter-group">
              <h3 className="filter-title"><FiSearch /> Tìm kiếm</h3>
              <input
                type="text"
                placeholder="Tên sách, tác giả..."
                className="form-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <h3 className="filter-title"><FiFilter /> Danh mục</h3>
              <button
                className={`filter-option ${!selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory('')}
              >
                Tất cả
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-option ${selectedCategory == cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id.toString())}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="filter-group">
              <h3 className="filter-title">💰 Khoảng giá</h3>
              {[
                { value: 'all', label: 'Tất cả' },
                { value: 'under100', label: 'Dưới 100.000đ' },
                { value: '100to200', label: '100.000đ - 200.000đ' },
                { value: 'over200', label: 'Trên 200.000đ' }
              ].map(opt => (
                <button
                  key={opt.value}
                  className={`filter-option ${priceRange === opt.value ? 'active' : ''}`}
                  onClick={() => setPriceRange(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Books Grid */}
          <main className="books-main">
            <div className="books-toolbar">
              <span className="results-count">{filteredBooks.length} kết quả</span>
              <select className="form-select sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp → Cao</option>
                <option value="price-desc">Giá: Cao → Thấp</option>
                <option value="rating">Đánh giá cao</option>
                <option value="name">A → Z</option>
              </select>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <h3 className="empty-state-title">Không tìm thấy sách</h3>
                <p className="empty-state-text">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            ) : (
              <div className="books-grid">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
