# 📖 BÁO CÁO ĐỒ ÁN: WEBSITE BÁN SÁCH BOOKVERSE

## PHẦN 1: TỔNG QUAN DỰ ÁN & CÔNG NGHỆ

---

## 1. GIỚI THIỆU DỰ ÁN

**Tên dự án:** BookVerse - Website bán sách trực tuyến  
**Mục tiêu:** Xây dựng website bán sách hoàn chỉnh với đầy đủ chức năng cho khách hàng (Client) và quản trị viên (Admin).  
**Link truy cập:** https://proportion-region-taxation-chemicals.trycloudflare.com

---

## 2. CÔNG NGHỆ SỬ DỤNG

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| **React** | 19.2.5 | Thư viện UI, xây dựng giao diện người dùng dạng SPA (Single Page Application) |
| **Vite** | 8.0.10 | Build tool, dev server - khởi tạo và đóng gói dự án cực nhanh |
| **React Router DOM** | 7.14.2 | Điều hướng trang (routing) - chuyển trang không reload |
| **Axios** | 1.16.0 | HTTP client - gọi API từ frontend đến backend |
| **React Icons** | 5.6.0 | Bộ icon đẹp (Feather Icons) cho giao diện |
| **React Toastify** | 11.1.0 | Hiển thị thông báo (toast notification) |
| **JSON Server** | 1.0.0-beta | Fake REST API backend từ file JSON |
| **Concurrently** | 9.2.1 | Chạy đồng thời frontend + backend bằng 1 lệnh |
| **Node.js** | 24.15.0 | Runtime JavaScript chạy server |
| **CSS thuần** | - | Styling giao diện, thiết kế dark mode, glassmorphism |
| **Google Fonts (Inter)** | - | Font chữ hiện đại, đẹp, dễ đọc |

---

## 3. KIẾN TRÚC DỰ ÁN

```
Frontend (React + Vite)     ←→     Backend (JSON Server)
   Port 3000                          Port 3001
       ↓                                  ↓
   Giao diện SPA              REST API (CRUD operations)
   - Components                - GET /books, /categories...
   - Pages                     - POST /orders, /users...
   - Contexts (State)          - PUT /books/:id...
   - Services (API calls)      - DELETE /books/:id...
```

**Mô hình hoạt động:**
1. Người dùng truy cập website (port 3000)
2. React render giao diện, gửi request API qua Axios
3. Vite proxy chuyển request `/api/*` → JSON Server (port 3001)
4. JSON Server xử lý CRUD trên file `db.json` và trả kết quả
5. React nhận dữ liệu, cập nhật giao diện

---

## 4. CẤU TRÚC THƯ MỤC

```
bookstore/
├── index.html              → Trang HTML gốc (entry point)
├── package.json            → Cấu hình dự án, dependencies, scripts
├── vite.config.js          → Cấu hình Vite (proxy API, port)
├── db.json                 → Database giả (JSON Server đọc file này)
├── public/                 → File tĩnh (favicon...)
├── src/
│   ├── main.jsx            → Entry point React (mount App vào DOM)
│   ├── App.jsx             → Component gốc, định nghĩa Routes
│   ├── index.css           → CSS toàn cục (design system)
│   │
│   ├── services/
│   │   └── api.js          → Tầng gọi API (axios)
│   │
│   ├── utils/
│   │   └── helpers.js      → Hàm tiện ích (format giá, ngày, trạng thái)
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx  → Quản lý đăng nhập/đăng ký (global state)
│   │   └── CartContext.jsx  → Quản lý giỏ hàng (global state)
│   │
│   ├── components/
│   │   ├── Header/          → Header (logo, search, menu, giỏ hàng)
│   │   ├── Footer/          → Footer (thông tin, liên kết)
│   │   └── BookCard/        → Card hiển thị sách
│   │
│   └── pages/
│       ├── Home/            → Trang chủ
│       ├── Books/           → Danh sách sách + bộ lọc
│       ├── BookDetail/      → Chi tiết sách
│       ├── Auth/            → Đăng nhập / Đăng ký
│       ├── Cart/            → Giỏ hàng
│       ├── Checkout/        → Thanh toán
│       ├── Orders/          → Lịch sử mua hàng
│       └── Admin/           → Trang quản trị
│           ├── AdminLayout  → Layout sidebar admin
│           ├── Dashboard    → Tổng quan thống kê
│           ├── AdminBooks   → CRUD sách
│           ├── AdminCategories → CRUD danh mục
│           ├── AdminUsers   → CRUD tài khoản
│           └── AdminOrders  → Quản lý đơn hàng
```

---

## 5. DANH SÁCH CHỨC NĂNG

### 5.1 Client (Khách hàng)

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 1 | Đăng ký | Tạo tài khoản mới (tên, email, mật khẩu, SĐT, địa chỉ) |
| 2 | Đăng nhập | Xác thực bằng email + mật khẩu, lưu session vào localStorage |
| 3 | Đăng xuất | Xóa session, quay về trạng thái chưa đăng nhập |
| 4 | Trang chủ | Hero banner, danh mục, sách nổi bật, sách bán chạy, newsletter |
| 5 | Danh sách sách | Hiển thị tất cả sách, lọc theo danh mục/giá, tìm kiếm, sắp xếp |
| 6 | Chi tiết sách | Ảnh, thông tin, mô tả, đánh giá, chọn số lượng, sách liên quan |
| 7 | Giỏ hàng | Thêm/xóa sách, thay đổi số lượng, tính tổng, miễn phí ship ≥300k |
| 8 | Thanh toán | Nhập địa chỉ, SĐT, chọn phương thức (COD/Banking/MoMo) |
| 9 | Lịch sử mua | Xem danh sách đơn hàng đã đặt, trạng thái đơn hàng |

### 5.2 Admin (Quản trị)

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 1 | Dashboard | Thống kê tổng sách, đơn hàng, doanh thu, người dùng |
| 2 | Quản lý sách | Xem danh sách, thêm mới, sửa, xóa sách (đầy đủ thông tin) |
| 3 | Quản lý danh mục | Xem, thêm, sửa, xóa danh mục sách |
| 4 | Quản lý tài khoản | Xem, thêm, sửa, xóa user, phân quyền admin/user |
| 5 | Quản lý đơn hàng | Xem danh sách đơn, cập nhật trạng thái đơn hàng |

### 5.3 Tài khoản demo

| Vai trò | Email | Mật khẩu |
|---------|-------|-----------|
| Admin | admin@bookstore.com | admin123 |
| User | user@bookstore.com | user123 |

---

## 6. THIẾT KẾ GIAO DIỆN

### Phong cách thiết kế:
- **Dark Mode** - Nền tối sang trọng, dễ nhìn
- **Glassmorphism** - Hiệu ứng kính mờ cho card, header
- **Gradient** - Màu chuyển sắc cho nút bấm, tiêu đề
- **Micro-animations** - Hiệu ứng hover, fadeIn, scale mượt mà
- **Responsive** - Tương thích mọi kích thước màn hình (PC, tablet, mobile)

### Bảng màu:
| Vai trò | Màu | Mã |
|---------|-----|-----|
| Primary | Indigo | #6366f1 |
| Accent | Amber | #f59e0b |
| Background | Navy | #0f172a |
| Card | Slate | #1e293b |
| Error/Price | Red | #ef4444 |
| Success | Emerald | #10b981 |

---

## 7. CÁCH CHẠY DỰ ÁN

```bash
# Bước 1: Mở terminal, vào thư mục bookstore
cd bookstore

# Bước 2: Cài dependencies (lần đầu)
npm install

# Bước 3: Chạy dự án (frontend + backend cùng lúc)
npm run dev

# Bước 4: Mở trình duyệt
# Client: http://localhost:3000
# API:    http://localhost:3001
```

---

## 8. API ENDPOINTS (Backend)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /books | Lấy danh sách sách |
| GET | /books/:id | Lấy chi tiết 1 cuốn sách |
| POST | /books | Thêm sách mới |
| PUT | /books/:id | Cập nhật sách |
| DELETE | /books/:id | Xóa sách |
| GET | /categories | Lấy danh mục |
| POST | /categories | Thêm danh mục |
| PUT | /categories/:id | Cập nhật danh mục |
| DELETE | /categories/:id | Xóa danh mục |
| GET | /users | Lấy danh sách user |
| POST | /users | Đăng ký / Thêm user |
| PUT | /users/:id | Cập nhật user |
| DELETE | /users/:id | Xóa user |
| GET | /orders | Lấy đơn hàng |
| GET | /orders?userId=X | Lấy đơn hàng theo user |
| POST | /orders | Tạo đơn hàng |
| PUT | /orders/:id | Cập nhật trạng thái đơn |

---

## 9. HƯỚNG DẪN SỬ DỤNG CHI TIẾT

### 9.1 Dành cho Khách hàng (Client)

#### 🛒 Mua sách
1. Vào **Trang chủ** → xem sách nổi bật hoặc bán chạy
2. Click **"Khám phá ngay"** hoặc vào menu **Sách** để xem toàn bộ
3. Dùng **bộ lọc** bên trái: lọc theo danh mục, khoảng giá, hoặc tìm kiếm tên sách/tác giả
4. Click vào sách → trang **Chi tiết** → chọn số lượng → nhấn **"Thêm vào giỏ hàng"**
5. Vào **Giỏ hàng** → kiểm tra đơn → nhấn **"Tiến hành thanh toán"**
6. ⚠️ **Cần đăng nhập** trước khi thanh toán

#### 🔑 Đăng nhập / Đăng ký
- **Đăng ký:** Điền đầy đủ thông tin → tự động đăng nhập luôn
- **Đăng nhập demo nhanh:**
  - Admin: `admin@bookstore.com` / `admin123`
  - User: `user@bookstore.com` / `user123`
- Session được lưu, không cần đăng nhập lại khi tải lại trang

#### 📦 Xem đơn hàng
- Đăng nhập → click tên → **"Lịch sử mua hàng"**
- Xem trạng thái đơn hàng (màu sắc badge biểu thị trạng thái)

---

### 9.2 Dành cho Quản trị viên (Admin)

#### 🔐 Truy cập trang Admin
1. Đăng nhập bằng tài khoản admin (`admin@bookstore.com` / `admin123`)
2. Click tên → **"Quản trị"** → vào trang `/admin`

#### 📚 Quản lý Sách
- **Xem danh sách:** Bảng hiển thị STT, ảnh, tên, tác giả, danh mục, giá, kho
- **Thêm sách mới:** Nhấn **"+ Thêm sách mới"** → điền form → Lưu
  - **Ảnh sách:** Nhập URL (ví dụ từ Tiki, Shopee) hoặc đường dẫn local (`images/Model_image/ten-anh.jpg`)
  - **Danh mục:** Tick chọn 1 hoặc nhiều danh mục (multi-select checkbox)
  - **Điểm đánh giá:** Nhập số từ 0.0 đến 5.0 (ví dụ: 4.8)
  - **Số lượt đánh giá:** Nhập số lượt (ví dụ: 2450)
- **Sửa sách:** Nhấn icon ✏️ → form tự điền dữ liệu sẵn → Cập nhật
- **Xóa sách:** Nhấn icon 🗑️ → xác nhận

#### 🗂️ Quản lý Danh mục
- Thêm/sửa/xóa danh mục. Ảnh danh mục hỗ trợ cả URL và đường dẫn local

#### 👥 Quản lý Tài khoản
- Xem danh sách user, thêm tài khoản mới, phân quyền admin/user
- Kiểm tra email trùng khi thêm mới

#### 📋 Quản lý Đơn hàng
- Xem danh sách đơn hàng, nhấn **"Cập nhật"** để đổi trạng thái
- **Khi chuyển sang "Đã giao":** Hệ thống tự động cộng thêm lượt bán vào từng cuốn sách trong đơn
- Thứ tự trạng thái: `Chờ xác nhận` → `Đã xác nhận` → `Đang giao` → `Đã giao` / `Đã hủy`

---

### 9.3 Nguồn ảnh sách gợi ý

Khi thêm sách mới, bạn có thể lấy link ảnh từ:
| Nguồn | Cách lấy |
|-------|---------|
| **Tiki** | Vào trang sách → chuột phải vào ảnh → Copy image address |
| **Shopee** | Tương tự Tiki |
| **Fahasa** | `fahasa.com` → trang sách → copy link ảnh |
| **Google Images** | Tìm tên sách → chọn ảnh bìa → "View image" → copy URL |
| **Ảnh local** | Đặt file vào `public/images/Model_image/` → nhập `images/Model_image/ten-anh.jpg` |

---

## 10. LƯU Ý KỸ THUẬT

| Vấn đề | Giải thích |
|--------|-----------|
| **Mật khẩu** | Lưu dạng plain text trong `db.json` — chỉ phù hợp môi trường demo/học tập |
| **ID sách** | json-server tự sinh ID ngẫu nhiên cho bản ghi mới, giao diện dùng STT để hiển thị |
| **Đa danh mục** | Trường `categoryId` hỗ trợ cả kiểu số đơn và mảng số |
| **Ảnh** | Hỗ trợ URL tuyệt đối (`http://...`) và đường dẫn tương đối (`images/...`) |
| **Phiên làm việc** | Dữ liệu lưu trong `db.json` — mọi thay đổi qua Admin Panel được lưu vĩnh viễn |
