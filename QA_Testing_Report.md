# 📋 BÁO CÁO KIỂM THỬ NGHIỆP VỤ (QA Testing Report)
**Dự án:** BookVerse – Website Bán Sách  
**Người kiểm thử:** QA Tester (AI Static Code Review)  
**Ngày:** 2026-05-16  
**Phạm vi:** Static Code Review + Data Analysis (db.json)

---

## 🎯 Tổng quan kết quả

Kiểm thử bằng phân tích tĩnh mã nguồn và dữ liệu thực tế trong `db.json`. Tổng cộng phát hiện **15 lỗi**:

| Mức độ | Số lượng |
|--------|---------|
| 🔴 Critical | 2 |
| 🟠 High | 5 |
| 🟡 Medium | 5 |
| 🟢 Low | 3 |

---

## 🔐 NHÓM 1: Tài khoản người dùng & Xác thực

### 🐛 [BUG-001] Mật khẩu lưu dạng plaintext

- **Mô tả:** `AuthContext.jsx` dòng 31 so sánh password trực tiếp client-side. Toàn bộ mật khẩu lưu plaintext trong `db.json`. Gọi `GET /users` trả về credential của mọi người dùng.
- **Bước tái hiện:** Mở `db.json` hoặc gọi `GET /users` → thấy `"password": "admin123"`.
- **Kết quả mong đợi:** Password hash (bcrypt/SHA-256), so sánh server-side.
- **Kết quả thực tế:** Password lộ hoàn toàn qua API.
- **Mức độ:** 🔴 **Critical**

---

### 🐛 [BUG-002] Crash khi truy cập `/checkout` chưa đăng nhập

- **Mô tả:** `Checkout.jsx` dòng 48 truy cập `user.id` khi đặt hàng, nhưng không guard `user !== null`. Truy cập thẳng URL `/checkout` khi chưa đăng nhập gây `TypeError`.
- **Bước tái hiện:** Chưa đăng nhập → thêm sách → truy cập `/checkout` → nhấn "Đặt hàng" → lỗi runtime.
- **Kết quả mong đợi:** Redirect về `/login`.
- **Kết quả thực tế:** Crash với `Cannot read properties of null`.
- **Mức độ:** 🟠 **High**

---

### 🐛 [BUG-003] Regex SĐT không nhất quán giữa Checkout và Register

- **Mô tả:** Checkout dùng `^(0|\+84)[3|5|7|8|9][0-9]{8}$` (hỗ trợ +84), Register dùng `/^0\d{9}$/` (chỉ 0xxx). Hai tiêu chuẩn khác nhau gây UX không đồng nhất.
- **Kết quả mong đợi:** Một bộ regex dùng chung.
- **Mức độ:** 🟡 **Medium**

---

### 🐛 [BUG-004] Đăng xuất không xóa giỏ hàng

- **Mô tả:** `AuthContext.jsx` `logout()` chỉ xóa `bookstore_user`, không xóa `bookstore_cart`. User khác đăng nhập cùng máy sẽ thấy giỏ hàng của người trước.
- **Bước tái hiện:** User A thêm sách → đăng xuất → User B đăng nhập → thấy giỏ của A.
- **Kết quả mong đợi:** `logout()` gọi `clearCart()`.
- **Mức độ:** 🟠 **High**

---

## 🛒 NHÓM 2: Giỏ hàng

### 🐛 [BUG-005] Thêm sách hết hàng vào giỏ từ BookCard

- **Mô tả:** `BookCard.jsx` gọi `addToCart(book)` không kiểm tra `stock`. `CartContext.addToCart` cũng không validate stock. Sách `stock=0` vẫn được thêm vào giỏ.
- **Bước tái hiện:** Set `stock: 0` cho một sách → nhấn "Thêm vào giỏ" ở trang danh sách → thêm thành công.
- **Kết quả mong đợi:** Nút bị disable hoặc toast lỗi khi `stock = 0`.
- **Mức độ:** 🟠 **High**

---

### 🐛 [BUG-006] Mã giảm giá bị mất khi sang trang Checkout

- **Mô tả:** `Cart.jsx` tính `finalTotal = cartTotal * 0.9` khi áp mã `BOOKVERSE10`. Tuy nhiên `Checkout.jsx` tính lại `total = cartTotal + shipping` từ `cartTotal` gốc của Context — **không nhận giảm giá**. Đơn hàng được lưu với giá chưa giảm.
- **Bước tái hiện:**
  1. Thêm sách → áp mã `BOOKVERSE10` → giỏ hiển thị giảm 10%.
  2. Chuyển sang Checkout → tổng tiền **trở về giá gốc**.
  3. Đặt hàng → `total` trong DB không trừ giảm giá.
- **Kết quả mong đợi:** Giảm giá được truyền sang Checkout và lưu vào đơn hàng.
- **Mức độ:** 🔴 **Critical**

---

### 🐛 [BUG-007] Mã giảm giá không có điều kiện tối thiểu

- **Mô tả:** `BOOKVERSE10` áp dụng cho mọi đơn dù chỉ 1đ, không có ngưỡng tối thiểu, không giới hạn số lần dùng.
- **Mức độ:** 🟡 **Medium**

---

### 🐛 [BUG-008] Thêm nhiều lần từ BookCard vượt tồn kho

- **Mô tả:** `CartContext.addToCart` cộng dồn `item.quantity + quantity` không kiểm tra giới hạn stock. Nhấn "Thêm vào giỏ" nhiều lần từ BookCard dẫn đến `quantity > stock`.
- **Bước tái hiện:** Sách `stock: 2` → nhấn "Thêm vào giỏ" 3 lần → giỏ hiển thị qty=3.
- **Kết quả mong đợi:** `addToCart` kiểm tra `Math.min(stock, existing.quantity + quantity)`.
- **Mức độ:** 🟠 **High**

---

## 💰 NHÓM 3: Giá và Thanh toán

### 🐛 [BUG-009] Total đơn hàng cũ không nhất quán trong DB

- **Mô tả:** Nhiều đơn trong `db.json` có `total` không khớp logic hiện tại:
  - Đơn `cbxGLz0aoA8`: tổng hàng 447.000đ < 300.000đ ngưỡng miễn ship → phải 477.000đ, nhưng lưu 447.000đ (thiếu ship).
  - Đơn `4w4PGWgMky4` & `hvuymiqYAmw`: phone = `"abc"`, `"agfgag"` — dữ liệu bẩn do bug cũ.
  - Đơn `aM-XNWZXOUk`: `phone: "09012345670901234567"` (20 ký tự — nhập đôi).
- **Kết quả mong đợi:** Làm sạch DB, total nhất quán.
- **Mức độ:** 🟡 **Medium**

---

## 📦 NHÓM 4: Sản phẩm & Tồn kho

### 🐛 [BUG-010] `categoryId` không đồng nhất kiểu dữ liệu

- **Mô tả:** Sách id=`11` có `categoryId: 4` (số nguyên), các sách khác có `categoryId: [4]` (mảng). Code xử lý cả hai nhưng dữ liệu không chuẩn hóa có thể gây lọc sai nếu thêm sách mới qua Admin.
- **Kết quả mong đợi:** Tất cả sách dùng `categoryId: number[]`.
- **Mức độ:** 🟡 **Medium**

---

### 🐛 [BUG-011] Wishlist không được lưu trữ

- **Mô tả:** `BookDetail.jsx` dùng `useState(false)` cho wishlist — mất sau refresh.
- **Bước tái hiện:** Nhấn "Yêu thích" → refresh → trạng thái reset.
- **Kết quả mong đợi:** Lưu vào localStorage hoặc DB.
- **Mức độ:** 🟢 **Low**

---

## 🔍 NHÓM 5: Tìm kiếm & Lọc

### 🐛 [BUG-012] Tìm kiếm không hỗ trợ gõ không dấu

- **Mô tả:** `Books.jsx` dòng 51 dùng `toLowerCase().includes()` — không normalize Unicode. Gõ `"dac nhan tam"` không tìm được "Đắc Nhân Tâm".
- **Fix đề xuất:** `str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()`
- **Mức độ:** 🟠 **High**

---

### 🐛 [BUG-013] Không reset trang khi đổi filter bằng thao tác thủ công

- **Mô tả:** Khi đang ở trang 3, thay đổi filter giá → `useEffect` reset page sau 300ms debounce, trong khoảng đó hiển thị có thể sai offset.
- **Mức độ:** 🟢 **Low**

---

## 📋 NHÓM 6: Trạng thái đơn hàng

### 🐛 [BUG-014] Admin có thể đảo ngược trạng thái đơn tùy ý

- **Mô tả:** Không có kiểm tra luồng trạng thái hợp lệ. Admin có thể chuyển đơn `delivered` → `pending`.
- **Kết quả mong đợi:** Chỉ cho phép tiến: `pending→confirmed→shipping→delivered`, và `*→cancelled`.
- **Mức độ:** 🟡 **Medium**

---

### 🐛 [BUG-015] Đơn hàng guest (userId: null) xuất hiện trong hệ thống

- **Mô tả:** Đơn `qPZTo1mlkko` có `userId: null` — tạo bởi user chưa đăng nhập (do bug cũ của Checkout). Đơn này không thuộc về ai, không hiển thị trong Orders page của bất kỳ user nào.
- **Mức độ:** 🟡 **Medium**

---

## 📊 Bảng tổng hợp

| ID | Tên lỗi | Nhóm | Mức độ |
|----|---------|------|--------|
| BUG-001 | Password lưu plaintext | Tài khoản | 🔴 Critical |
| BUG-002 | Crash checkout chưa đăng nhập | Tài khoản | 🟠 High |
| BUG-003 | Regex SĐT không nhất quán | Tài khoản | 🟡 Medium |
| BUG-004 | Logout không xóa giỏ hàng | Tài khoản | 🟠 High |
| BUG-005 | Thêm sách hết hàng vào giỏ | Giỏ hàng | 🟠 High |
| BUG-006 | Mã giảm giá mất khi sang Checkout | Giỏ hàng | 🔴 Critical |
| BUG-007 | Mã giảm giá không điều kiện | Giỏ hàng | 🟡 Medium |
| BUG-008 | Thêm nhiều lần vượt tồn kho | Giỏ hàng | 🟠 High |
| BUG-009 | Total đơn cũ không nhất quán | Thanh toán | 🟡 Medium |
| BUG-010 | categoryId sai kiểu dữ liệu | Sản phẩm | 🟡 Medium |
| BUG-011 | Wishlist không lưu trữ | Sản phẩm | 🟢 Low |
| BUG-012 | Tìm kiếm không hỗ trợ không dấu | Tìm kiếm | 🟠 High |
| BUG-013 | Không reset page khi đổi filter | Tìm kiếm | 🟢 Low |
| BUG-014 | Admin đảo ngược trạng thái đơn | Đơn hàng | 🟡 Medium |
| BUG-015 | Đơn hàng guest userId null | Đơn hàng | 🟡 Medium |

---

## ✅ Điểm hoạt động đúng

- ✅ Phí ship: miễn phí khi đơn ≥ 300.000đ (Checkout + Cart nhất quán).
- ✅ Format giá VND chuẩn (`Intl.NumberFormat`).
- ✅ % giảm giá tính đúng (`getDiscount`).
- ✅ Nút "+" ở Cart disable khi đạt stock.
- ✅ BookDetail giới hạn qty theo stock (`Math.min`).
- ✅ Checkout validate regex SĐT.
- ✅ Chặn email trùng khi đăng ký.
- ✅ Giỏ hàng persist qua localStorage.
- ✅ Redirect `/cart` khi giỏ trống mà vào `/checkout`.
- ✅ Lịch sử đơn hàng lọc đúng theo `userId`.

---

## 🔧 Ưu tiên sửa ngay

1. **BUG-006** — Truyền `discountedTotal` sang Checkout qua Context hoặc URL param.
2. **BUG-005 + BUG-008** — Thêm kiểm tra stock vào `addToCart()` của CartContext.
3. **BUG-004** — Gọi `clearCart()` trong `logout()`.
4. **BUG-012** — Normalize chuỗi tìm kiếm.
5. **BUG-002** — Guard `if (!user) return <Navigate to="/login" />` đầu Checkout.
