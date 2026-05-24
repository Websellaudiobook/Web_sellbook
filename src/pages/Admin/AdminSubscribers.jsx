import { useEffect, useState } from 'react'
import { FiMail, FiTrash2 } from 'react-icons/fi'
import { getSubscribers, deleteSubscriber } from '../../services/api'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import './Admin.css'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchData = async () => {
    const res = await getSubscribers()
    setSubscribers(res.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id) => {
    try {
      await deleteSubscriber(id)
      toast.success('Xóa email thành công!')
      setConfirmDelete(null)
      fetchData()
    } catch (err) {
      toast.error(err.friendlyMessage || 'Có lỗi xảy ra!')
    }
  }

  return (
    <div className="page-enter">
      <div className="admin-page-header">
          <h1 className="admin-page-title"><FiMail /> Danh sách email nhận tin</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Email</th>
                <th>Ngày đăng ký</th>
                <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: 600 }}>{item.email}</td>
                <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(item.id)}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <ConfirmDialog
            title="Xác nhận xóa"
            message="Bạn chắc chắn muốn xóa email này?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}
