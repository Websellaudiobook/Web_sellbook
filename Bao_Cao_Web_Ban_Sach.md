# BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB
**Đề tài:** Xây dựng website bán sách trực tuyến

---

## MỤC LỤC
1. [CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI](#chương-1-tổng-quan-đề-tài)
2. [CHƯƠNG 2. CÔNG CỤ VÀ NGÔN NGỮ SỬ DỤNG](#chương-2-công-cụ-và-ngôn-ngữ-sử-dụng)
3. [CHƯƠNG 3. GIAO DIỆN WEBSITE VÀ CHỨC NĂNG](#chương-3-giao-diện-website-và-chức-năng)
4. [CHƯƠNG 4. KẾT LUẬN](#chương-4-kết-luận)

---

## CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI

### 1.1. Lý do chọn đề tài
Trong thời đại công nghệ số phát triển mạnh mẽ, việc ứng dụng công nghệ thông tin vào hoạt động kinh doanh và mua sắm trực tuyến ngày càng trở nên phổ biến. Các website thương mại điện tử đóng vai trò quan trọng trong việc kết nối giữa nhà cung cấp và khách hàng, đặc biệt trong lĩnh vực bán lẻ như sách – một sản phẩm thiết yếu phục vụ cho nhu cầu học tập và phát triển tri thức.
Sinh viên thực hiện: Nhóm
Nguyễn Hữu Gia Bảo - A51286
Nguyễn Khắc Đại - A50764
Đỗ Đình Vinh - A51067
Đoàn Thế Thuận - A51048
Đề tài không chỉ giúp áp dụng lý thuyết đã học vào thực tiễn mà còn rèn luyện tư duy thiết kế, khả năng phân tích nhu cầu người dùng, cũng như học cách tổ chức nội dung và bố cục hợp lý cho một trang web thương mại điện tử hiện đại.

### 1.2. Mục tiêu nghiên cứu
Website được xây dựng nhằm cung cấp một nền tảng bán sách trực tuyến, giúp người dùng dễ dàng tiếp cận các đầu sách chất lượng, nội dung đa dạng và cập nhật theo xu hướng. Giao diện được thiết kế thân thiện, dễ sử dụng, phù hợp với mọi đối tượng.
Mục tiêu chính là tạo nên một website với bố cục rõ ràng, hình ảnh đẹp, thông tin sách đầy đủ, dễ dàng tìm kiếm và thao tác. Người dùng có thể xem chi tiết sản phẩm, mua hàng, quản lý đơn hàng. Website còn hướng đến việc tối ưu trải nghiệm người dùng trên mọi thiết bị, từ máy tính đến điện thoại di động.

### 1.3. Kết quả mong muốn đạt được
Xây dựng hoàn chỉnh giao diện website bán sách với các trang chức năng cơ bản cho Khách hàng (Trang chủ, Danh mục sản phẩm, Chi tiết sản phẩm, Giỏ hàng, Đặt hàng, Trang cá nhân...) và cho Quản trị viên (Quản lý sách, danh mục, người dùng, đơn hàng).
Đảm bảo tính thẩm mỹ, mượt mà và logic xử lý chính xác trên Frontend.

---

## CHƯƠNG 2. CÔNG CỤ VÀ NGÔN NGỮ SỬ DỤNG

### 2.1. Ngôn ngữ và Thư viện sử dụng
#### 2.1.1. HTML5 & CSS3
HTML5 được sử dụng để xây dựng phần khung chính cho website. Việc sử dụng đúng thẻ ngữ nghĩa giúp mã nguồn dễ đọc và tối ưu SEO. CSS3 được sử dụng để thiết kế giao diện trang web, kiểm soát màu sắc, bố cục, hiệu ứng nâng cao và khả năng responsive.

#### 2.1.2. JavaScript (ES6+)
JavaScript là ngôn ngữ lập trình phía client được sử dụng rộng rãi để tạo ra các tương tác động trên trang web, xử lý sự kiện người dùng và tương tác với API.

#### 2.1.3. ReactJS & Vite
ReactJS (phiên bản 19) là thư viện JavaScript phổ biến do Facebook phát triển, được sử dụng để xây dựng giao diện người dùng dạng component. React giúp tối ưu việc render giao diện nhờ cơ chế Virtual DOM, cải thiện đáng kể hiệu năng. Dự án sử dụng Vite làm công cụ build tool mang lại tốc độ khởi động và Hot Module Replacement (HMR) cực kỳ nhanh chóng.

#### 2.1.4. React Router DOM
Thư viện quản lý định tuyến (routing) cho ứng dụng React (Single Page Application). Cho phép điều hướng giữa các trang (Home, Shop, Cart, Admin...) một cách mượt mà không cần tải lại toàn bộ trang web.

#### 2.1.5. JSON Server
JSON Server là công cụ giả lập REST API từ dữ liệu định dạng JSON (file `db.json`). Công cụ này cho phép tạo một server có đầy đủ các chức năng CRUD (Create, Read, Update, Delete) chỉ với một file, phục vụ tốt cho quá trình phát triển Frontend khi Backend chưa hoàn thiện.

### 2.2. Công cụ
#### 2.2.1. Visual Studio Code
Visual Studio Code (VS Code) là trình soạn thảo mã nguồn phổ biến nhất hiện nay, hỗ trợ nhiều plugin đa dạng, tự động gợi ý cú pháp, highlight mã lệnh giúp tăng tốc quá trình lập trình.

#### 2.2.2. Trình duyệt Web (Chrome / Edge)
Dùng để chạy thử nghiệm ứng dụng, sử dụng Developer Tools để debug, kiểm tra responsive và Network API.

---

## CHƯƠNG 3. GIAO DIỆN WEBSITE VÀ CHỨC NĂNG

### 3.1. Đặc tả chức năng các trang website (Dành cho Khách hàng)

| Tên chức năng | Mô tả chức năng | Đối tượng |
|---|---|---|
| **Trang chủ (Home)** | Hiển thị banner, sách nổi bật, sách mới, các chương trình khuyến mãi. | Mọi người dùng |
| **Danh mục sách (Books)** | Hiển thị danh sách tất cả các sách, hỗ trợ phân trang, lọc và tìm kiếm theo danh mục. | Mọi người dùng |
| **Chi tiết sách** | Hiển thị thông tin chi tiết (tên, tác giả, giá, mô tả), thêm vào giỏ hàng hoặc wishlist. | Mọi người dùng |
| **Đăng ký / Đăng nhập** | Xác thực người dùng, lưu trữ phiên đăng nhập, cấp quyền mua hàng. | Khách / User |
| **Giỏ hàng (Cart)** | Quản lý sản phẩm đã thêm, thay đổi số lượng, xóa sản phẩm, tính tổng tiền. | Khách / User |
| **Thanh toán (Checkout)** | Điền thông tin giao hàng, xác nhận đặt hàng và tạo đơn hàng. | User đã đăng nhập |
| **Đơn hàng (Orders)** | Xem lịch sử đơn hàng đã đặt và trạng thái đơn hàng. | User đã đăng nhập |
| **Trang cá nhân (Profile)**| Xem và cập nhật thông tin cá nhân cơ bản. | User đã đăng nhập |
| **Wishlist** | Lưu các sản phẩm yêu thích để mua sau. | User đã đăng nhập |

### 3.2. Chức năng website của Admin

| Tên chức năng | Mô tả chức năng | Đối tượng |
|---|---|---|
| **Dashboard** | Thống kê tổng quan số lượng đơn hàng, người dùng, doanh thu. | Admin |
| **Quản lý danh mục** | Thêm, sửa, xóa các danh mục sách (Categories). | Admin |
| **Quản lý sách** | Thêm mới sách, sửa thông tin sách, xóa sách (CRUD). | Admin |
| **Quản lý người dùng** | Xem danh sách người dùng, cấp quyền, xóa tài khoản (Users). | Admin |
| **Quản lý đơn hàng** | Xem thông tin đơn hàng của khách, cập nhật trạng thái đơn hàng. | Admin |
| **Quản lý mã giảm giá** | Tạo và quản lý các chương trình khuyến mãi, mã giảm giá (Discounts). | Admin |
| **Quản lý người đăng ký**| Quản lý email khách hàng đăng ký nhận tin (Subscribers). | Admin |

### 3.3. Tổ chức cấu trúc thư mục (Project Structure)
Dự án được tổ chức theo cấu trúc module gọn gàng trong thư mục `src`:
- `components/`: Chứa các component dùng chung (Header, Footer, ScrollToTop, ProtectedRoute).
- `pages/`: Chứa các component đại diện cho các trang giao diện (Home, Books, BookDetail, Cart, Admin...).
- `contexts/`: Chứa cấu hình Context API (AuthContext) quản lý state đăng nhập toàn cục.
- `hooks/`: Chứa các custom hooks xử lý logic tái sử dụng.
- `services/`: Chứa logic gọi API thông qua Axios.
- `utils/`: Chứa các hàm tiện ích.

---

## CHƯƠNG 4. KẾT LUẬN

### 4.1. Thời gian và quá trình triển khai
Quá trình thực hiện được chia thành các giai đoạn cụ thể:
- **Giai đoạn 1:** Phân tích yêu cầu, thiết kế cơ sở dữ liệu giả lập (JSON).
- **Giai đoạn 2:** Xây dựng bố cục giao diện, cấu trúc React (components, pages, routing).
- **Giai đoạn 3:** Lập trình chức năng Client (hiển thị sách, giỏ hàng, thanh toán).
- **Giai đoạn 4:** Lập trình chức năng Admin (quản lý thống kê, CRUD dữ liệu).
- **Giai đoạn 5:** Kiểm tra, sửa lỗi, hoàn thiện tính năng và viết báo cáo.

### 4.2. Mức độ hoàn thành của đề tài
Dự án đã hoàn thành được hầu hết các chức năng cốt lõi của một trang web thương mại điện tử hiện đại từ phía Front-end, bao gồm đầy đủ trang tương tác cho người dùng và hệ thống quản trị chuyên nghiệp cho Admin.

### 4.3. Các vấn đề đã làm được
- Xây dựng thành công ứng dụng Single Page Application (SPA) với ReactJS.
- Giao diện trực quan, tính thẩm mỹ cao, responsive trên nhiều thiết bị.
- Triển khai phân quyền người dùng (User / Admin) rõ ràng, sử dụng Route bảo vệ (ProtectedRoute).
- Tích hợp giả lập API hoàn chỉnh bằng JSON Server để thao tác thay đổi dữ liệu thực tế.
- Tối ưu hóa hiệu năng bằng cách ứng dụng tính năng lazy-loading (code splitting) cho các component.

### 4.4. Các vấn đề chưa làm được
- Chưa có Backend thực tế (NodeJS/Python/PHP...) và Database thực thụ (MySQL/MongoDB).
- Chưa tích hợp cổng thanh toán trực tuyến (như VNPay, MoMo).
- Tính năng bảo mật và mã hóa mật khẩu chưa ở mức độ cao do sử dụng mock backend.

### 4.5. Những khó khăn gặp phải và cách giải quyết
- **Khó khăn:** Việc chia sẻ dữ liệu (state) giữa nhiều component có cấu trúc sâu (ví dụ: thông tin đăng nhập, phân quyền) gặp khó khăn.
  **Giải quyết:** Ứng dụng Context API (AuthContext) kết hợp với các Custom Hooks để quản lý luồng dữ liệu toàn cục hiệu quả hơn.
- **Khó khăn:** Quản lý bất đồng bộ khi thực hiện gọi API nhiều lần để lấy dữ liệu.
  **Giải quyết:** Sử dụng async/await một cách hệ thống, kết hợp thư viện Axios và kiểm tra kỹ các promise trả về, bắt lỗi (catch) đầy đủ.

### 4.6. Hướng phát triển trong tương lai
- Xây dựng hệ thống Backend thực thụ bằng NodeJS/ExpressJS để tăng tính bảo mật và khả năng mở rộng hệ thống.
- Tích hợp tính năng gửi email xác nhận tự động khi đặt hàng.
- Nâng cấp tính năng gợi ý sản phẩm, hỗ trợ chức năng đánh giá/bình luận sản phẩm.
- Tích hợp thanh toán điện tử bằng các ví điện tử hoặc cổng thanh toán quốc tế.
