export default function ConfirmDialog({ title, message, onConfirm, onCancel, confirmText = 'Xóa', confirmVariant = 'danger' }) {
  return (
    <div className="admin-form-modal" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="admin-form-card confirm-dialog">
        <h2>{title || '⚠️ Xác nhận'}</h2>
        <p>{message || 'Bạn có chắc chắn muốn thực hiện hành động này?'}</p>
        <div className="admin-form-actions" style={{ justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>
          <button className={`btn btn-${confirmVariant}`} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
