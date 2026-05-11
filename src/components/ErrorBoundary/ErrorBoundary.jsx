import { Component } from 'react'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <FiAlertTriangle className="error-boundary-icon" />
            <h1>Oops! Đã xảy ra lỗi</h1>
            <p>Ứng dụng gặp sự cố không mong muốn. Vui lòng thử tải lại trang.</p>
            <div className="error-boundary-actions">
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                <FiRefreshCw /> Tải lại trang
              </button>
              <button
                className="btn btn-secondary"
                onClick={this.handleReset}
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
