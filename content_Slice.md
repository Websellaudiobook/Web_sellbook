# 📖 NỘI DUNG THUYẾT TRÌNH — BOOKVERSE
## Website bán sách trực tuyến | Bài tập lớn Công nghệ Web

---

## Slide 1: Tiêu đề dự án

**Đề tài:** Phát triển hệ thống Web Thương mại điện tử chuyên biệt cho Sách — **BookVerse**.

**Sinh viên thực hiện:**

| Thành viên | Phụ trách slide | Nội dung | Số slide |
|------------|-----------------|----------|----------|
| **A** | Slide 1, 2, 3, 4 | Giới thiệu, Thị trường, User Flow, Kiến trúc | 4 |
| **B** | Slide 5, 6, 7, 8 | Stack công nghệ, Use Case, ERD, API | 4 |
| **C** | Slide 9, 10, 11, 12 | Giao diện Client, Giỏ hàng, Thanh toán, Admin | 4 |
| **D** | Slide 13, 14, 15 | Bảo mật & Tối ưu, Kiểm thử, Kết luận | 3 |

**Công nghệ cốt lõi:** React 19, Vite, JSON Server, Node.js.

**Mục tiêu:** Xây dựng website bán sách hoàn chỉnh gồm hệ thống mua hàng cho khách và trang quản trị cho admin, với giao diện hiện đại Dark Mode và hiệu năng cao nhờ kiến trúc SPA.

---

## Slide 2: Phân tích thị trường & Bài toán thực tế

**Vấn đề:** Các website bán sách truyền thống thường tải lại toàn bộ trang khi chuyển đổi, trải nghiệm chậm. Người dùng cần khả năng tìm kiếm nhanh theo danh mục, khoảng giá, và xem đánh giá trước khi mua.

**Giải pháp của BookVerse:**
- Ứng dụng SPA (Single Page Application) — chuyển trang mượt mà, không reload.
- Tìm kiếm real-time theo tên sách / tác giả, lọc theo 6 danh mục và khoảng giá tùy chọn.
- Quản trị kho hàng chặt chẽ: giới hạn mua theo tồn kho, tự động cộng lượt bán khi đơn hoàn thành.

---

## Slide 3: Đối tượng sử dụng & Luồng người dùng (User Flow)

**Khách vãng lai:** Xem trang chủ, duyệt danh sách sách, lọc theo danh mục / giá, xem chi tiết sách, thêm vào giỏ hàng.

**Khách hàng (đã đăng nhập):** Đăng ký / đăng nhập, thanh toán đơn hàng (COD / Banking / MoMo), xem lịch sử mua hàng và trạng thái đơn.

**Admin:** Truy cập Dashboard thống kê, quản lý CRUD sách / danh mục / tài khoản / đơn hàng, cập nhật trạng thái đơn theo 5 bước tuần tự.

---

## Slide 4: Kiến trúc hệ thống (Architecture)

**Mô hình:** Client-Server tách biệt, hai service chạy song song.

**Frontend:** React + Vite → SPA chạy tại port 3000. Giao diện được chia thành Components, Pages, Contexts (state toàn cục) và Services (tầng gọi API).

**Backend:** JSON Server → REST API tự động từ file `db.json`, chạy tại port 3001. Hỗ trợ đầy đủ CRUD (GET, POST, PUT, DELETE).

**Giao tiếp:** Axios gửi HTTP request dạng JSON. Vite proxy chuyển tiếp `/api/*` → port 3001, tránh lỗi CORS.

---

## Slide 5: Stack công nghệ chi tiết

**Frontend:** React 19.2.5 + CSS thuần (Dark Mode, Glassmorphism). React Router DOM 7.14 cho SPA routing. React Icons (Feather) + React Toastify cho UI.

**Backend:** JSON Server 1.0.0-beta — tạo REST API đầy đủ từ 1 file JSON duy nhất. Không cần viết code backend.

**Database:** File `db.json` gồm 5 bảng: users, categories, books (12 cuốn), orders, cart.

**DevOps/Tools:** Node.js v24.15, Vite 8.0.10 (build + dev server), Concurrently (chạy FE + BE đồng thời bằng 1 lệnh `npm run dev`), Git quản lý mã nguồn.

---

## Slide 6: Sơ đồ chức năng (Use Case Diagram)

**Actor — User (Khách hàng):**
- Đăng ký / Đăng nhập / Đăng xuất
- Duyệt sách (tìm kiếm, lọc, sắp xếp)
- Xem chi tiết sách + đánh giá
- Quản lý giỏ hàng (thêm, xóa, thay đổi số lượng)
- Thanh toán (COD / Banking / MoMo)
- Xem lịch sử đơn hàng

**Actor — Admin (Quản trị viên):**
- Xem Dashboard tổng quan (sách, đơn, doanh thu, user)
- CRUD Sách (14 trường, multi-select danh mục)
- CRUD Danh mục (6 danh mục)
- CRUD Tài khoản (phân quyền admin/user)
- Quản lý Đơn hàng (cập nhật trạng thái 5 bước)

---

## Slide 7: Thiết kế Cơ sở dữ liệu (ERD)

**Các thực thể chính trong `db.json`:**

- **Users:** id, name, email, password, phone, address, role (admin/user), createdAt.
- **Categories:** id, name, description, image.
- **Books:** id, title, author, description, price, originalPrice, categoryId (số hoặc mảng), stock, pages, image, publisher, year, language, isbn, rating, reviews, featured, bestseller, sold.
- **Orders:** id, userId, items[ ], totalAmount, shippingFee, paymentMethod, status, shippingAddress, phone, note, createdAt.

**Mối quan hệ:**
- 1-n: Category → Books (1 danh mục chứa nhiều sách, 1 sách có thể thuộc nhiều danh mục nhờ `categoryId` dạng mảng).
- 1-n: User → Orders (1 user có nhiều đơn hàng).
- n-n: Order ↔ Books (qua mảng `items` trong order, mỗi item chứa bookId + quantity + price).

---

## Slide 8: Thiết kế API (RESTful Services)

**Các Endpoint chính (JSON Server — Port 3001):**

- `GET /api/books` — Lấy toàn bộ danh sách sách.
- `GET /api/books/:id` — Lấy chi tiết 1 cuốn sách theo ID.
- `POST /api/books` — Thêm sách mới (Admin).
- `PUT /api/books/:id` — Cập nhật thông tin sách (Admin).
- `DELETE /api/books/:id` — Xóa sách (Admin).
- `GET /api/categories` — Lấy danh mục sách.
- `POST /api/users` — Đăng ký tài khoản mới.
- `GET /api/orders?userId=X` — Lấy đơn hàng theo user.
- `POST /api/orders` — Tạo đơn hàng mới khi thanh toán.
- `PUT /api/orders/:id` — Admin cập nhật trạng thái đơn hàng.

> Tất cả API calls được tập trung trong file `src/services/api.js` qua Axios instance với baseURL `/api`.

---

## Slide 9: Giao diện Trang chủ & UX Tìm kiếm

**Trang chủ (Home.jsx)** gồm 6 section:
1. Hero banner với gradient text, nút CTA "Khám phá ngay".
2. 4 card tính năng: Miễn phí ship, Sách chính hãng, Đổi trả 30 ngày, Hỗ trợ 24/7.
3. Grid 6 danh mục sách có ảnh minh họa.
4. Sách nổi bật (4 cuốn, ưu tiên nhiều lượt đánh giá nhất).
5. Sách bán chạy (4 cuốn, sắp xếp theo reviews).
6. Newsletter — form đăng ký nhận tin.

**Tìm kiếm (Books.jsx):**
- Thanh search bar tìm theo tên sách / tác giả theo thời gian thực.
- Sidebar lọc theo danh mục (checkbox) và khoảng giá.
- Toolbar sắp xếp: mới nhất, giá tăng/giảm, rating cao nhất, A-Z.
- Hỗ trợ URL params: `/books?categoryId=1&search=abc`.

---

## Slide 10: Giao diện Chi tiết & Quản lý giỏ hàng

**Chi tiết sách (BookDetail.jsx):**
- Ảnh bìa sách sticky khi cuộn trang, badge giảm giá.
- Thông tin đầy đủ: tác giả, NXB, năm, ngôn ngữ, số trang, ISBN.
- Rating sao + số lượt đánh giá, trạng thái tồn kho.
- Chọn số lượng bằng nút +/−, nút "Thêm vào giỏ hàng".
- Tab: Mô tả sách | Thông tin chi tiết (bảng specs).
- Section sách liên quan cùng danh mục.

**Giỏ hàng (Cart.jsx):**
- State quản lý bằng **Context API** (`CartContext.jsx`) — truy cập từ mọi trang.
- Lưu vào **localStorage** — không mất dữ liệu khi F5 / reload.
- Nút tăng số lượng tự động khóa khi đạt giới hạn tồn kho.
- Panel tóm tắt: tạm tính + phí ship (miễn phí ≥ 300.000đ) + tổng cộng.

---

## Slide 11: Quy trình Đặt hàng & Thanh toán

**Luồng đặt hàng (Checkout.jsx):**
1. Kiểm tra đăng nhập — chưa login sẽ yêu cầu đăng nhập trước.
2. Nhập thông tin giao hàng: địa chỉ, SĐT, ghi chú.
3. Chọn phương thức thanh toán: COD / Chuyển khoản ngân hàng / Ví MoMo (radio card).
4. Xác nhận đơn → gọi `POST /api/orders` tạo đơn mới.
5. Xóa giỏ hàng → chuyển hướng sang trang lịch sử đơn hàng.

**Trạng thái đơn hàng:** Chờ xác nhận → Đã xác nhận → Đang giao → Đã giao / Đã hủy.

> Khi admin chuyển đơn sang "Đã giao", hệ thống tự động cập nhật trường `sold` cho từng sách trong đơn.

---

## Slide 12: Trang Quản trị (Admin Panel)

**Dashboard:** 4 stat card (tổng sách, đơn hàng, doanh thu, người dùng) + bảng 5 đơn gần nhất.

**CRUD Sách (AdminBooks.jsx):** Form 14 trường đầy đủ. Multi-select danh mục bằng checkbox group. Admin có thể chỉnh trực tiếp rating và số lượt đánh giá. Hỗ trợ ảnh từ URL (`http://...`) hoặc đường dẫn local (`images/...`).

**CRUD Danh mục / Tài khoản:** Thêm, sửa, xóa với kiểm tra dữ liệu (email trùng, phân quyền admin/user).

**Quản lý Đơn hàng (AdminOrders.jsx):** Modal chi tiết đơn, dropdown cập nhật trạng thái tuần tự. Cột STT thay cho ID ngẫu nhiên của json-server.

---

## Slide 13: Bảo mật & Tối ưu hệ thống

**Bảo mật:**
- Mật khẩu lưu dạng plain text trong `db.json` — phù hợp môi trường demo/học tập. (Production cần mã hóa Bcrypt).
- Phân quyền: trường `role` trong user, kiểm tra `isAdmin` qua Context API. Admin route được bảo vệ — không phải admin sẽ bị redirect về `/login`.
- Session lưu trong localStorage, tự khôi phục khi reload.

**Tối ưu:**
- Lazy loading: React Router chỉ render component khi truy cập route tương ứng.
- Giỏ hàng + session lưu localStorage — giảm API call không cần thiết.
- CSS Design System với biến CSS — thay đổi theme chỉ cần sửa `:root`.
- Responsive breakpoints (768px, 1024px) — tương thích Mobile, Tablet, Desktop.

---

## Slide 14: Kiểm thử (Testing) & Kết quả

**Kiểm thử chức năng:**
- Luồng mua hàng: Trang chủ → Xem sách → Chi tiết → Thêm giỏ → Thanh toán → Lịch sử — hoạt động đúng.
- Giỏ hàng: Tính tổng chính xác, giới hạn theo tồn kho, miễn phí ship ≥ 300k.
- Admin CRUD: Thêm/sửa/xóa sách, danh mục, user, đơn hàng — dữ liệu đồng bộ với `db.json`.
- Cập nhật trạng thái đơn → tự động cộng `sold` khi "Đã giao".

**Kiểm thử giao diện:**
- Responsive trên 3 kích thước: Mobile (< 768px), Tablet (768–1024px), Desktop (> 1024px).
- Dark mode hiển thị nhất quán, glassmorphism và animation mượt mà.

**Kết quả:** Hệ thống chạy ổn định, không lỗi logic nghiệp vụ, giao diện đẹp trên mọi thiết bị.

---

## Slide 15: Kết luận & Hướng phát triển

**Đã hoàn thành:**
- Website bán sách Full-stack hoàn chỉnh: React SPA + JSON Server REST API.
- 9 chức năng Client + 5 chức năng Admin đầy đủ.
- Giao diện Dark Mode, Glassmorphism, Responsive, Micro-animations.
- Tự động hóa: cộng lượt bán khi giao hàng, multi-select danh mục, giới hạn kho.

**Hướng phát triển:**
- Tích hợp Recommendation System (AI gợi ý sách dựa trên lịch sử mua).
- Tích hợp thanh toán điện tử thực tế (MoMo / ZaloPay API).
- Thay JSON Server bằng backend thật (Node.js + Express + MongoDB/SQL).
- Mã hóa mật khẩu Bcrypt + JWT authentication.
- Triển khai lên hosting (Vercel cho FE, Render cho BE).
