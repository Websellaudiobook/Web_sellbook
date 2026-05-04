# 📖 BÁO CÁO PHẦN 2: CHI TIẾT TỪNG FILE CODE

---

## 1. FILE CẤU HÌNH

### 1.1 `index.html`
- **Công dụng:** File HTML gốc duy nhất của ứng dụng SPA
- **Tại sao cần:** React cần 1 file HTML chứa `<div id="root">` để mount toàn bộ ứng dụng vào
- **Chi tiết:** Khai báo meta SEO tiếng Việt, load font Inter từ Google Fonts, link đến `main.jsx`

### 1.2 `package.json`
- **Công dụng:** File cấu hình chính của Node.js project
- **Tại sao cần:** Định nghĩa tên project, scripts chạy, và danh sách thư viện
- **Chi tiết:**
  - `npm run dev` → chạy đồng thời Vite (frontend) + JSON Server (backend)
  - `npm run client` → chỉ chạy frontend
  - `npm run server` → chỉ chạy backend API
  - `npm run build` → đóng gói production

### 1.3 `vite.config.js`
- **Công dụng:** Cấu hình Vite build tool
- **Tại sao cần:** Vite cần biết dùng React plugin và cách proxy API
- **Chi tiết:**
  - Bật plugin React (hỗ trợ JSX, HMR)
  - Dev server chạy port 3000
  - Proxy `/api/*` → `localhost:3001` (JSON Server), giúp tránh lỗi CORS

### 1.4 `db.json`
- **Công dụng:** Database giả cho JSON Server
- **Tại sao cần:** JSON Server đọc file này và tự tạo REST API đầy đủ CRUD
- **Chi tiết:** Chứa 5 bảng dữ liệu:
  - `users` (2 user mẫu: admin + user thường)
  - `categories` (6 danh mục sách)
  - `books` (12 cuốn sách với đầy đủ thông tin)
  - `orders` (2 đơn hàng mẫu)
  - `cart` (giỏ hàng)

---

## 2. ENTRY POINTS

### 2.1 `src/main.jsx`
- **Công dụng:** Điểm khởi đầu của ứng dụng React
- **Tại sao cần:** Nơi React mount vào DOM, bọc App trong các Provider
- **Chi tiết:** Bọc App bằng `BrowserRouter` (routing), `AuthProvider` (xác thực), `CartProvider` (giỏ hàng)

### 2.2 `src/App.jsx`
- **Công dụng:** Component gốc, định nghĩa toàn bộ routes
- **Tại sao cần:** Tổ chức trang nào hiển thị ở URL nào
- **Chi tiết:**
  - Routes Client: `/`, `/books`, `/books/:id`, `/login`, `/register`, `/cart`, `/checkout`, `/orders`
  - Routes Admin: `/admin`, `/admin/books`, `/admin/categories`, `/admin/users`, `/admin/orders`
  - Client routes bọc trong `Header + Footer`, Admin routes dùng `AdminLayout` riêng
  - Tích hợp `ToastContainer` cho thông báo toàn app

### 2.3 `src/index.css`
- **Công dụng:** CSS toàn cục - Design System
- **Tại sao cần:** Định nghĩa biến CSS, styles dùng chung cho toàn bộ app
- **Chi tiết:**
  - CSS Variables: màu sắc, font, spacing, shadow, gradient, border-radius
  - Reset CSS: loại bỏ style mặc định trình duyệt
  - Custom scrollbar: thanh cuộn đẹp
  - Utility classes: `.container`, `.btn`, `.card`, `.badge`, `.form-input`...
  - Animations: `fadeIn`, `slideIn`, `scaleIn`, `float`, `shimmer`
  - Data table, pagination, modal, empty state styles
  - Responsive breakpoints (768px, 1024px)

---

## 3. SERVICES (Tầng gọi API)

### 3.1 `src/services/api.js`
- **Công dụng:** Tập trung tất cả API calls vào 1 file
- **Tại sao cần:** Tách biệt logic gọi API khỏi components, dễ bảo trì
- **Chi tiết:** Tạo axios instance với baseURL `/api`, export các hàm:
  - Books: `getBooks`, `getBook`, `createBook`, `updateBook`, `deleteBook`
  - Categories: `getCategories`, `createCategory`, `updateCategory`, `deleteCategory`
  - Users: `getUsers`, `loginUser`, `registerUser`, `updateUser`, `deleteUser`
  - Orders: `getOrders`, `getOrdersByUser`, `createOrder`, `updateOrder`

---

## 4. UTILS (Tiện ích)

### 4.1 `src/utils/helpers.js`
- **Công dụng:** Các hàm helper dùng chung
- **Tại sao cần:** Tránh lặp code, format dữ liệu thống nhất
- **Chi tiết:**
  - `formatPrice(price)` → format tiền VND: `86000` → `86.000 ₫`
  - `formatDate(date)` → format ngày Việt Nam: `01/04/2026 10:30`
  - `getDiscount(price, originalPrice)` → tính % giảm giá
  - `getStatusLabel(status)` → chuyển `pending` → `Chờ xác nhận`
  - `getStatusColor(status)` → trả về class CSS cho badge

---

## 5. CONTEXTS (Quản lý State toàn cục)

### 5.1 `src/contexts/AuthContext.jsx`
- **Công dụng:** Quản lý trạng thái đăng nhập/đăng ký toàn app
- **Tại sao cần:** Mọi component đều cần biết user đã đăng nhập chưa, là admin hay user
- **Chi tiết:**
  - `login(email, password)` → gọi API xác thực, lưu user vào localStorage
  - `register(userData)` → kiểm tra email trùng, tạo user mới
  - `logout()` → xóa session khỏi localStorage
  - `isAdmin` → kiểm tra quyền admin
  - Tự động khôi phục session khi reload trang (đọc localStorage)

### 5.2 `src/contexts/CartContext.jsx`
- **Công dụng:** Quản lý giỏ hàng toàn app
- **Tại sao cần:** Giỏ hàng cần truy cập từ nhiều trang (header badge, cart page, checkout)
- **Chi tiết:**
  - `addToCart(book, qty)` → thêm sách, nếu đã có thì tăng số lượng
  - `removeFromCart(bookId)` → xóa sách khỏi giỏ
  - `updateQuantity(bookId, qty)` → thay đổi số lượng
  - `clearCart()` → xóa toàn bộ giỏ hàng (sau khi đặt hàng)
  - `cartTotal` → tổng tiền, `cartCount` → tổng số lượng
  - Lưu giỏ hàng vào localStorage, không mất khi reload

---

## 6. COMPONENTS (Thành phần tái sử dụng)

### 6.1 `src/components/Header/Header.jsx` + `Header.css`
- **Công dụng:** Thanh navigation trên cùng
- **Chi tiết:**
  - Logo BookVerse (link về trang chủ)
  - Ô tìm kiếm sách (search bar)
  - Menu: Trang chủ, Sách
  - Icon giỏ hàng + badge số lượng
  - User menu dropdown: Lịch sử, Quản trị (admin), Đăng xuất
  - Nút Đăng nhập/Đăng ký (khi chưa login)
  - Hamburger menu cho mobile
  - CSS: Fixed header, glassmorphism, backdrop-filter blur

### 6.2 `src/components/Footer/Footer.jsx` + `Footer.css`
- **Công dụng:** Chân trang
- **Chi tiết:** 4 cột: Brand + social links, Danh mục, Hỗ trợ, Liên hệ

### 6.3 `src/components/BookCard/BookCard.jsx` + `BookCard.css`
- **Công dụng:** Card hiển thị 1 cuốn sách
- **Tại sao cần:** Dùng lại ở trang chủ, trang danh sách, sách liên quan
- **Chi tiết:**
  - Ảnh bìa sách (aspect ratio 3:4)
  - Badge giảm giá (-20%), Best Seller
  - Hover overlay: nút "Xem chi tiết" + "Thêm vào giỏ"
  - Tên sách, tác giả, rating stars, giá bán + giá gốc

---

## 7. PAGES - CLIENT

### 7.1 `src/pages/Home/Home.jsx` + `Home.css`
- **Công dụng:** Trang chủ - landing page
- **Chi tiết các section:**
  1. **Hero:** Banner lớn với tiêu đề gradient, 2 nút CTA, thống kê, hình sách 3D
  2. **Features:** 4 card (Miễn phí ship, Chính hãng, Đổi trả, Hỗ trợ 24/7)
  3. **Danh mục:** Grid 6 danh mục sách với ảnh + mô tả
  4. **Sách nổi bật:** 4 sách featured
  5. **Sách bán chạy:** 4 sách bestseller
  6. **Newsletter:** Form đăng ký nhận tin
- **CSS đặc biệt:** Floating orbs animation, book stack 3D hover, gradient text

### 7.2 `src/pages/Books/Books.jsx` + `Books.css`
- **Công dụng:** Trang danh sách sách với bộ lọc
- **Chi tiết:**
  - Sidebar bộ lọc: Tìm kiếm text, Lọc danh mục, Lọc khoảng giá
  - Toolbar: Số kết quả + Dropdown sắp xếp (mới nhất, giá, rating, A-Z)
  - Grid sách responsive (3 cột → 2 cột mobile)
  - Đọc URL params để lọc: `/books?categoryId=1&search=abc`

### 7.3 `src/pages/BookDetail/BookDetail.jsx` + `BookDetail.css`
- **Công dụng:** Trang chi tiết 1 cuốn sách
- **Chi tiết:**
  - Ảnh sách lớn (sticky khi scroll)
  - Thông tin: tên, tác giả, rating, giá, badge giảm giá
  - Metadata: NXB, năm XB, ngôn ngữ, số trang
  - Trạng thái tồn kho
  - Chọn số lượng (nút +/-)
  - Nút thêm giỏ hàng, yêu thích, chia sẻ
  - Tab: Mô tả sách | Thông tin chi tiết (bảng specs)
  - Section sách liên quan (cùng danh mục)

### 7.4 `src/pages/Auth/Login.jsx` + `Auth.css`
- **Công dụng:** Trang đăng nhập
- **Chi tiết:**
  - Form: Email + Mật khẩu (có toggle show/hide)
  - Xác thực qua API, lưu session localStorage
  - Admin → redirect `/admin`, User → redirect `/`
  - Hiển thị demo accounts
  - CSS: Centered card, floating orbs background

### 7.5 `src/pages/Auth/Register.jsx`
- **Công dụng:** Trang đăng ký tài khoản mới
- **Chi tiết:** Form 5 trường: Họ tên, Email, Mật khẩu, SĐT, Địa chỉ. Kiểm tra email trùng.

### 7.6 `src/pages/Cart/Cart.jsx` + `Cart.css`
- **Công dụng:** Trang giỏ hàng
- **Chi tiết:**
  - Danh sách sách trong giỏ (ảnh, tên, tác giả, giá)
  - Nút +/- thay đổi số lượng, nút xóa
  - Panel tóm tắt: Tạm tính, Phí ship (miễn phí từ 300k), Tổng cộng
  - Nút "Tiến hành thanh toán" (yêu cầu đăng nhập)
  - Empty state khi giỏ trống

### 7.7 `src/pages/Checkout/Checkout.jsx` + `Checkout.css`
- **Công dụng:** Trang thanh toán
- **Chi tiết:**
  - Form giao hàng: Địa chỉ, SĐT, Ghi chú
  - Chọn phương thức thanh toán: COD / Banking / MoMo (radio cards)
  - Tóm tắt đơn hàng: danh sách sách, tạm tính, ship, tổng
  - Submit → tạo order qua API → clear cart → redirect lịch sử

### 7.8 `src/pages/Orders/Orders.jsx` + `Orders.css`
- **Công dụng:** Trang lịch sử mua hàng
- **Chi tiết:** Danh sách đơn hàng theo user, mỗi đơn hiển thị: ID, sản phẩm, trạng thái (badge màu), ngày đặt, tổng tiền

---

## 8. PAGES - ADMIN

### 8.1 `src/pages/Admin/AdminLayout.jsx` + `Admin.css`
- **Công dụng:** Layout riêng cho trang admin (không dùng Header/Footer client)
- **Chi tiết:**
  - Kiểm tra quyền admin, nếu không phải admin → redirect `/login`
  - Sidebar cố định bên trái: Dashboard, Sách, Danh mục, Đơn hàng, Tài khoản, Về trang chủ
  - `<Outlet>` hiển thị nội dung trang con bên phải

### 8.2 `src/pages/Admin/Dashboard.jsx`
- **Công dụng:** Trang tổng quan admin
- **Chi tiết:**
  - 4 stat cards: Tổng sách, Đơn hàng, Doanh thu, Người dùng
  - Bảng đơn hàng gần đây (5 đơn mới nhất)

### 8.3 `src/pages/Admin/AdminBooks.jsx`
- **Công dụng:** CRUD sách (Thêm, Sửa, Xóa, Xem danh sách)
- **Chi tiết:**
  - Bảng dữ liệu: ID, Ảnh, Tên, Tác giả, Danh mục, Giá, Kho, Hành động
  - Nút "Thêm sách mới" → mở modal form
  - Form modal: 14 trường (tên, tác giả, danh mục, mô tả, giá bán, giá gốc, tồn kho, số trang, ảnh, NXB, năm XB, ngôn ngữ, ISBN, checkbox nổi bật/bán chạy)
  - Nút sửa → mở modal với dữ liệu đã điền sẵn
  - Nút xóa → dialog xác nhận trước khi xóa

### 8.4 `src/pages/Admin/AdminCategories.jsx`
- **Công dụng:** CRUD danh mục
- **Chi tiết:** Bảng + Modal form (tên, mô tả, ảnh). Thêm/Sửa/Xóa danh mục.

### 8.5 `src/pages/Admin/AdminUsers.jsx`
- **Công dụng:** CRUD tài khoản người dùng
- **Chi tiết:**
  - Bảng: ID, Tên, Email, SĐT, Vai trò (Admin/User badge), Ngày tạo
  - Form: Họ tên, Email, Mật khẩu, SĐT, Vai trò (dropdown), Địa chỉ
  - Kiểm tra email trùng khi thêm mới

### 8.6 `src/pages/Admin/AdminOrders.jsx`
- **Công dụng:** Quản lý đơn hàng
- **Chi tiết:**
  - Bảng: ID, Sản phẩm, Tổng tiền, Thanh toán, Trạng thái, Ngày đặt
  - Nút "Cập nhật" → modal hiển thị chi tiết đơn + dropdown đổi trạng thái
  - 5 trạng thái: Chờ xác nhận → Đã xác nhận → Đang giao → Đã giao / Đã hủy

---

## 9. LUỒNG HOẠT ĐỘNG CHÍNH

### Luồng mua hàng:
```
Trang chủ → Xem sách → Chi tiết sách → Thêm giỏ hàng → 
Giỏ hàng → Thanh toán → Đặt hàng → Lịch sử mua hàng
```

### Luồng admin:
```
Đăng nhập (admin) → Dashboard → Quản lý sách/danh mục/user/đơn hàng
```

---

*Báo cáo được tạo tự động - BookVerse Project © 2026*
