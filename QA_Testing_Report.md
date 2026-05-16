# 📊 Báo Cáo Kiểm Thử (QA Testing Report) - Website BookVerse

**Người kiểm thử:** QA Tester (AI)
**Môi trường:** Localhost (http://localhost:3000)
**Nền tảng:** Desktop & Mobile Browser (Mô phỏng)

---

## 🎯 Tổng quan kết quả (Executive Summary)

Quá trình kiểm thử khám phá (Exploratory Testing) đã được thực hiện trên các luồng nghiệp vụ cốt lõi của website BookVerse: Đăng nhập/Đăng ký, Duyệt sản phẩm, Giỏ hàng, Thanh toán và Quản lý tài khoản. 

Hệ thống hoạt động tương đối ổn định về mặt luồng cơ bản (Happy Path). Tuy nhiên, vẫn tồn tại một số vấn đề liên quan đến **Xác thực dữ liệu (Data Validation)**, **Trải nghiệm người dùng (UX)** và **Responsive trên thiết bị di động**.

Dưới đây là chi tiết các lỗi (Bugs) được phát hiện:

---

## 1. Kiểm tra chức năng (Functional Testing)

### 🐛 [BUG-001] Lỗi hiển thị sai hình ảnh sản phẩm
* **Mô tả:** Hình ảnh bìa sách không khớp với thông tin sách trong cơ sở dữ liệu. Cụ thể, cuốn "JavaScript: The Good Parts" đang hiển thị hình ảnh bìa của một cuốn sách khác.
* **Các bước tái hiện:**
  1. Truy cập trang "Sách".
  2. Chọn bộ lọc danh mục "Công nghệ".
  3. Cuộn đến sản phẩm "JavaScript: The Good Parts" và quan sát hình ảnh.
* **Kết quả mong đợi:** Hiển thị đúng bìa sách "JavaScript: The Good Parts".
* **Kết quả thực tế:** Hiển thị bìa sách khác (sai lệch dữ liệu).
* **Mức độ:** `Low` (Ảnh hưởng hiển thị, không ảnh hưởng nghiệp vụ).

### 🐛 [BUG-002] Form thanh toán không xác thực số điện thoại
* **Mô tả:** Hệ thống cho phép người dùng đặt hàng thành công ngay cả khi nhập các ký tự chữ cái (không phải số) vào trường Số điện thoại.
* **Các bước tái hiện:**
  1. Thêm một sản phẩm bất kỳ vào giỏ hàng.
  2. Đi tới trang Thanh toán (Checkout).
  3. Điền địa chỉ hợp lệ và nhập "abc" vào trường số điện thoại.
  4. Nhấn nút "Đặt hàng".
* **Kết quả mong đợi:** Form báo lỗi đỏ ở trường số điện thoại, yêu cầu nhập đúng định dạng số và không cho phép submit.
* **Kết quả thực tế:** Đơn hàng được tạo thành công và lưu vào cơ sở dữ liệu với số điện thoại "abc".
* **Mức độ:** `High` (Sai lệch dữ liệu giao hàng nghiêm trọng).

### 🐛 [BUG-003] Thiếu phản hồi (Feedback) sau khi đặt hàng thành công
* **Mô tả:** Sau khi nhấn "Đặt hàng", giỏ hàng bị xóa nhưng không có bất kỳ thông báo trực quan nào (trang cảm ơn, popup thông báo, hay chuyển hướng) để báo cho người dùng biết đơn hàng đã thành công.
* **Các bước tái hiện:**
  1. Hoàn tất việc điền thông tin thanh toán.
  2. Nhấn nút "Đặt hàng".
* **Kết quả mong đợi:** Hệ thống hiển thị thông báo "Đặt hàng thành công" hoặc chuyển hướng sang trang "Cảm ơn quý khách".
* **Kết quả thực tế:** Hệ thống xử lý ngầm, giỏ hàng trở nên trống rỗng nhưng giao diện không thay đổi trạng thái rõ ràng.
* **Mức độ:** `Medium` (Gây hoang mang cho người dùng, có thể dẫn đến việc họ đặt hàng nhiều lần).

### 🐛 [BUG-004] Thiếu tính năng Mã giảm giá (Discount Code)
* **Mô tả:** Theo yêu cầu của website thương mại điện tử, giỏ hàng cần có phần áp dụng mã giảm giá nhưng trên giao diện hiện tại không tìm thấy trường nhập liệu này.
* **Mức độ:** `Medium` (Thiếu tính năng chức năng).

---

## 2. Kiểm tra giao diện và UX (UI/UX Testing)

### 🐛 [BUG-005] Lỗi Responsive trên thiết bị di động (Mobile/Tablet)
* **Mô tả:** Bố cục trang web bị vỡ khi xem trên màn hình nhỏ (ví dụ: độ phân giải 400px của điện thoại). Header bị chồng chéo các phần tử, thiếu Menu Hamburger để điều hướng gọn gàng.
* **Các bước tái hiện:**
  1. Mở trang web.
  2. Thu nhỏ kích thước cửa sổ trình duyệt xuống dưới 768px (hoặc dùng DevTools chuyển sang chế độ Mobile).
* **Kết quả mong đợi:** Giao diện co giãn mượt mà, thanh điều hướng ngang chuyển thành Menu Hamburger ẩn.
* **Kết quả thực tế:** Các nút bấm và chữ bị ép sát vào nhau, khó thao tác.
* **Mức độ:** `High` (Làm giảm nghiêm trọng trải nghiệm của người dùng mobile).

### 🐛 [BUG-006] Cảnh báo thuộc tính `autocomplete` ở Form đăng nhập
* **Mô tả:** Các trường `email` và `password` trong form đăng nhập thiếu thuộc tính `autocomplete`, khiến trình duyệt đưa ra cảnh báo và khó tự động điền mật khẩu.
* **Mức độ:** `Low` (Chỉ là cảnh báo UX).

---

## 3. Kiểm tra Edge Cases & Logic

✅ **Passed (Đã vượt qua):**
* **Số lượng giỏ hàng:** Nút giảm số lượng (`-`) hoạt động tốt, đã bị disable hoặc chặn không cho phép giảm xuống dưới `1`. Không thể thêm số lượng âm thông qua giao diện.
* **Đăng nhập sai:** Nhập sai email hoặc sai mật khẩu đều bị hệ thống từ chối thành công.

⚠️ **Cần kiểm tra thêm (Back-end Logic):**
* Dù giao diện không cho phép giảm dưới 1, nhưng nếu gửi API trực tiếp (bằng Postman) với `quantity: -5`, hệ thống (json-server) có thể vẫn chấp nhận. Khuyến nghị thêm logic kiểm tra `quantity > 0` trước khi lưu vào database.

---

## 4. Hiệu năng & Bảo mật (Performance & Security)

* **Hiệu năng:** Tốc độ phản hồi từ lúc click nút "Thêm vào giỏ hàng" đến khi giỏ hàng cập nhật là tức thời. Điều hướng trang bằng React Router mượt mà, không bị chớp trang (reload).
* **Bảo mật:** 
  * Chức năng tìm kiếm chưa lọc kỹ thẻ HTML. Nếu người dùng nhập `<script>alert(1)</script>` vào ô tìm kiếm, dù React mặc định chống XSS tốt, nhưng vẫn cần chú ý nếu sử dụng `dangerouslySetInnerHTML` ở đâu đó.
  * Việc lưu trữ thông tin User/Phiên đăng nhập hiện tại nếu chỉ dựa vào LocalStorage mà không mã hóa (hoặc JWT token) sẽ dễ bị tấn công đánh cắp session.

---

## 💡 Đề xuất cải thiện (Recommendations)

1. **Bổ sung Form Validation:** Cài đặt thư viện như `Formik` và `Yup` (hoặc `react-hook-form`) để kiểm tra chặt chẽ định dạng Email và Regex cho Số điện thoại Việt Nam trước khi cho phép submit.
2. **Cải thiện luồng Checkout:** Thêm trang `Checkout Success` kèm theo Mã Đơn Hàng (Order ID) để tăng độ uy tín và tạo cảm giác an tâm cho khách mua.
3. **Phát triển Mobile UI:** Sử dụng Media Queries trong CSS hoặc thư viện UI (như Tailwind, Bootstrap, Material-UI) để xây dựng Drawer/Hamburger Menu cho màn hình thiết bị di động.
4. **Kiểm tra dữ liệu đầu vào:** Ở phía API (hoặc middleware), luôn phải kiểm tra `quantity > 0` và sách còn trong kho hay không trước khi tạo đơn hàng.

---
*Báo cáo được thực hiện bởi hệ thống kiểm thử tự động. Vui lòng kiểm tra lại trên môi trường thực tế để xác nhận các bản vá lỗi.*
