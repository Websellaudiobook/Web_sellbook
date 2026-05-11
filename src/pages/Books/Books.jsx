import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { getBooks, getCategories } from '../../services/api'
import BookCard from '../../components/BookCard/BookCard'
import { SkeletonBookGrid } from '../../components/Skeleton/Skeleton'
import useDebounce from '../../hooks/useDebounce'
import { BOOKS_PER_PAGE, SORT_OPTIONS, PRICE_RANGES } from '../../utils/constants'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 300)

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
    setCurrentPage(1)
  }, [searchParams])

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase()
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
  }, [books, debouncedSearch, selectedCategory, priceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * BOOKS_PER_PAGE
    return filteredBooks.slice(start, start + BOOKS_PER_PAGE)
  }, [filteredBooks, currentPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedCategory, priceRange, sortBy])

  // Active filters count for mobile badge
  const activeFilters = [selectedCategory, priceRange !== 'all' ? priceRange : '', debouncedSearch].filter(Boolean).length

  if (loading) {
    return (
      <div className="books-page page-enter">
        <div className="container">
          <div className="books-header">
            <h1>Tất cả sách</h1>
            <p>Đang tải danh sách sách...</p>
          </div>
          <SkeletonBookGrid count={8} />
        </div>
      </div>
    )
  }

  return (
    <div className="books-page page-enter">
      <div className="container">
        <div className="books-header">
          <h1>Tất cả sách</h1>
          <p>Khám phá {books.length} đầu sách chất lượng</p>
        </div>

        {/* Mobile Filter Toggle */}
        <button className="mobile-filter-toggle" onClick={() => setFilterOpen(true)}>
          <FiFilter /> Bộ lọc
          {activeFilters > 0 && <span className="filter-badge">{activeFilters}</span>}
        </button>

        <div className="books-layout">
          {/* Sidebar Filters */}
          {filterOpen && <div className="filter-overlay" onClick={() => setFilterOpen(false)} />}
          <aside className={`books-sidebar ${filterOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-mobile-header">
              <h3>Bộ lọc</h3>
              <button onClick={() => setFilterOpen(false)}><FiX /></button>
            </div>

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
              {PRICE_RANGES.map(opt => (
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
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <h3 className="empty-state-title">Không tìm thấy sách</h3>
                <p className="empty-state-text">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button className="btn btn-secondary" onClick={() => {
                  setSearch(''); setSelectedCategory(''); setPriceRange('all'); setSortBy('newest')
                }}>
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="books-grid">
                  {paginatedBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <FiChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={currentPage === page ? 'active' : ''}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
