import './Skeleton.css'

export function SkeletonBookCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-pulse"></div>
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-line-sm skeleton-pulse"></div>
        <div className="skeleton-line skeleton-line-md skeleton-pulse"></div>
        <div className="skeleton-line skeleton-line-stars skeleton-pulse"></div>
        <div className="skeleton-line skeleton-line-price skeleton-pulse"></div>
      </div>
    </div>
  )
}

export function SkeletonBookGrid({ count = 4 }) {
  return (
    <div className="books-grid">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonBookCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonDetail() {
  return (
    <div className="skeleton-detail">
      <div className="skeleton-detail-image skeleton-pulse"></div>
      <div className="skeleton-detail-info">
        <div className="skeleton-line skeleton-line-sm skeleton-pulse"></div>
        <div className="skeleton-line skeleton-line-lg skeleton-pulse"></div>
        <div className="skeleton-line skeleton-line-md skeleton-pulse"></div>
        <div className="skeleton-line skeleton-line-price skeleton-pulse" style={{ width: '40%' }}></div>
        <div className="skeleton-line skeleton-pulse" style={{ height: '48px', marginTop: '24px' }}></div>
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="skeleton-table">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skeleton-table-row skeleton-pulse"></div>
      ))}
    </div>
  )
}
