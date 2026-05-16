# 📚 BookVerse - E-Commerce Book Store

BookVerse là một dự án website thương mại điện tử chuyên bán sách, được xây dựng với giao diện hiện đại, thân thiện với người dùng và tích hợp đầy đủ các tính năng mua sắm trực tuyến cơ bản.

## 🌟 Tính năng nổi bật

* **Người dùng (Khách hàng):**
  * Duyệt và tìm kiếm sách theo tên, tác giả, danh mục.
  * Xem chi tiết thông tin sách (giá, mô tả, đánh giá).
  * Quản lý giỏ hàng (thêm, sửa số lượng, xóa sản phẩm).
  * Áp dụng mã giảm giá.
  * Thanh toán đơn hàng (Checkout) với Form thông minh tự động kiểm tra số điện thoại.
  * Đăng nhập / Đăng ký tài khoản.

* **Quản trị viên (Admin):**
  * Quản lý danh sách sách (thêm, sửa, xóa).
  * Quản lý danh mục sách.
  * Quản lý người dùng.
  * Xem và xử lý đơn hàng.

## 🛠 Công nghệ sử dụng

* **Frontend:** React.js, Vite, React Router DOM
* **Styling:** CSS thuần (Custom CSS), React Icons
* **Backend (Mock API):** json-server
* **State Management:** React Context API

## 🚀 Hướng dẫn cài đặt và chạy thử

### 1. Yêu cầu hệ thống
* Node.js (phiên bản 16.x trở lên)
* npm hoặc yarn

### 2. Cài đặt thư viện
Clone project về máy, mở terminal tại thư mục gốc của dự án và chạy lệnh:
```bash
npm install
```

### 3. Khởi động dự án
Chạy lệnh sau để khởi động đồng thời cả Frontend (Vite) và Backend Mock API (json-server):
```bash
npm run dev
```

Sau khi chạy, bạn có thể truy cập:
* **Giao diện người dùng:** `http://localhost:3000`
* **Mock API Server:** `http://localhost:3001`

## 📝 Cấu trúc thư mục chính

```text
src/
├── components/   # Các UI Component dùng chung (Navbar, Footer, Modal,...)
├── contexts/     # Quản lý state toàn cục (AuthContext, CartContext)
├── pages/        # Các trang chính của website (Home, Cart, Checkout, Admin,...)
├── services/     # Tương tác với API
└── utils/        # Các hàm hỗ trợ, hằng số (constants)
```

## 🤝 Đóng góp
Dự án được phát triển nhằm mục đích học tập và làm bài tập lớn môn Công Nghệ Web. Mọi đóng góp và ý kiến đều được chào đón!
