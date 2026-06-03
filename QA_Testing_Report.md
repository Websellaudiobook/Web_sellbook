# BÁO CÁO KIỂM THỬ CHỨC NĂNG WEBSITE BÁN SÁCH

**Dự án:** BookVerse - Website cửa hàng bán sách  
**Phạm vi kiểm thử:** Đăng nhập, khách hàng, sản phẩm/sách, đơn hàng, thanh toán, thống kê/báo cáo, giao diện người dùng và dữ liệu  
**Ghi chú:** Báo cáo này tập trung vào kiểm thử chức năng nghiệp vụ, không trình bày phần bảo mật.

---

## 1. Test chức năng đăng nhập

| STT | Chức năng | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Đăng nhập đúng | Nhập email và mật khẩu hợp lệ, bấm Đăng nhập | Đăng nhập thành công, chuyển vào trang chủ hoặc trang quản trị theo vai trò |
| 2 | Sai mật khẩu | Nhập email đúng, mật khẩu sai | Hiển thị thông báo sai tài khoản hoặc mật khẩu |
| 3 | Bỏ trống dữ liệu | Không nhập email hoặc mật khẩu | Hệ thống yêu cầu nhập đầy đủ thông tin |
| 4 | Sai định dạng email | Nhập email không đúng định dạng | Hiển thị lỗi định dạng email |
| 5 | Đăng xuất | Bấm Đăng xuất | Tài khoản được đăng xuất khỏi hệ thống |

---

## 2. Test chức năng khách hàng

| STT | Chức năng | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Thêm khách hàng | Nhập đầy đủ tên, số điện thoại, email, địa chỉ rồi bấm Thêm | Khách hàng được lưu vào hệ thống |
| 2 | Trùng số điện thoại | Thêm khách hàng có số điện thoại đã tồn tại | Hệ thống báo lỗi trùng số điện thoại |
| 3 | Trùng email | Thêm khách hàng có email đã tồn tại | Hệ thống báo lỗi trùng email |
| 4 | Sửa thông tin | Chọn khách hàng và cập nhật thông tin | Dữ liệu được cập nhật chính xác |
| 5 | Xóa khách hàng | Chọn khách hàng và bấm Xóa | Khách hàng được xóa hoặc báo lỗi nếu đã phát sinh đơn hàng |
| 6 | Tìm kiếm khách hàng | Nhập tên hoặc số điện thoại vào ô tìm kiếm | Hiển thị đúng khách hàng cần tìm |

---

## 3. Test chức năng sản phẩm / sách

| STT | Chức năng | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Thêm sách | Nhập tên sách, mã SKU/ISBN, danh mục, giá bán, số lượng tồn | Sách được thêm thành công |
| 2 | Trùng mã SKU/ISBN | Thêm sách có mã SKU/ISBN đã tồn tại | Hệ thống báo lỗi trùng mã |
| 3 | Giá bán âm | Nhập giá bán nhỏ hơn 0 | Hệ thống không cho lưu |
| 4 | Số lượng âm | Nhập số lượng tồn kho nhỏ hơn 0 | Hệ thống báo lỗi |
| 5 | Sửa sách | Cập nhật giá bán hoặc mô tả sách | Dữ liệu được cập nhật đúng |
| 6 | Xóa sách | Xóa sách chưa phát sinh đơn hàng | Sách được xóa khỏi hệ thống |
| 7 | Tìm kiếm sách | Tìm theo tên sách, mã SKU/ISBN hoặc danh mục | Hiển thị đúng kết quả |

---

## 4. Test chức năng đơn hàng

| STT | Chức năng | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Tạo đơn hàng | Chọn khách hàng, sản phẩm và số lượng | Đơn hàng được tạo thành công |
| 2 | Mua nhiều sách | Thêm nhiều sản phẩm vào một đơn hàng | Hệ thống lưu đúng chi tiết đơn hàng |
| 3 | Số lượng mua vượt tồn kho | Nhập số lượng mua lớn hơn số lượng tồn | Hệ thống báo không đủ hàng |
| 4 | Tính tổng tiền | Thêm sản phẩm vào đơn hàng | Tổng tiền được tính chính xác |
| 5 | Hủy đơn hàng | Tạo đơn rồi chọn hủy | Trạng thái đơn hàng chuyển thành "Đã hủy" |
| 6 | Cập nhật tồn kho | Hoàn tất đơn hàng | Số lượng tồn kho giảm đúng theo số lượng đã bán |

---

## 5. Test chức năng thanh toán

| STT | Chức năng | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Thanh toán tiền mặt | Chọn phương thức thanh toán COD/tiền mặt | Hệ thống lưu đúng phương thức thanh toán |
| 2 | Thanh toán chuyển khoản | Chọn phương thức chuyển khoản | Hệ thống lưu đúng phương thức thanh toán |
| 3 | Thanh toán thiếu tiền | Nhập số tiền thanh toán nhỏ hơn tổng tiền | Hệ thống báo thanh toán chưa đủ |
| 4 | Thanh toán thừa tiền | Nhập số tiền lớn hơn tổng tiền | Hệ thống tính tiền thừa chính xác |
| 5 | Thanh toán đơn đã hủy | Chọn đơn hàng đã hủy để thanh toán | Hệ thống không cho thanh toán |

---

## 6. Test chức năng thống kê / báo cáo

| STT | Chức năng | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Thống kê doanh thu ngày | Chọn ngày cần thống kê | Hiển thị đúng tổng doanh thu trong ngày |
| 2 | Thống kê doanh thu tháng | Chọn tháng cần thống kê | Hiển thị doanh thu theo tháng |
| 3 | Sách bán chạy | Mở báo cáo sách bán chạy | Hiển thị danh sách sách có số lượng bán cao nhất |
| 4 | Khách hàng mua nhiều | Xem báo cáo khách hàng | Hiển thị khách hàng có tổng mua hàng cao |
| 5 | Lọc theo thời gian | Chọn khoảng ngày bắt đầu và ngày kết thúc | Báo cáo hiển thị đúng dữ liệu trong khoảng thời gian |

---

## 7. Test giao diện người dùng

| STT | Chức năng | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Kiểm tra menu | Bấm lần lượt các menu trên website | Các trang mở đúng chức năng |
| 2 | Kiểm tra nút bấm | Bấm các nút Thêm, Sửa, Xóa, Lưu, Hủy | Các nút hoạt động đúng |
| 3 | Kiểm tra responsive | Mở web trên máy tính, tablet, điện thoại | Giao diện không bị vỡ |
| 4 | Kiểm tra thông báo lỗi | Nhập dữ liệu sai | Hệ thống hiển thị thông báo rõ ràng |
| 5 | Kiểm tra form nhập | Bỏ trống các ô bắt buộc | Hệ thống yêu cầu nhập đầy đủ |

---

## 8. Test dữ liệu trong cơ sở dữ liệu

| STT | Nội dung test | Câu lệnh / thao tác test | Kết quả mong đợi |
|---|---|---|---|
| 1 | Kiểm tra khóa chính | Thêm dữ liệu trùng mã khách hàng / mã sản phẩm | Hệ thống không cho trùng khóa chính |
| 2 | Kiểm tra khóa ngoại | Tạo đơn hàng với mã khách hàng không tồn tại | Hệ thống báo lỗi khóa ngoại |
| 3 | Kiểm tra ràng buộc UNIQUE | Thêm email, số điện thoại hoặc mã SKU/ISBN trùng | Hệ thống không cho lưu |
| 4 | Kiểm tra CHECK | Nhập giá bán, số lượng, tổng tiền nhỏ hơn 0 | Hệ thống báo lỗi |
| 5 | Kiểm tra dữ liệu sau khi bán | Hoàn tất đơn hàng | Đơn hàng, chi tiết đơn hàng, thanh toán và tồn kho được cập nhật đúng |

---

## Kết luận

Người kiểm thử tiến hành kiểm tra toàn bộ hệ thống website cửa hàng bán sách thông qua các chức năng chính gồm: đăng nhập, quản lý khách hàng, quản lý sản phẩm, quản lý đơn hàng, thanh toán, thống kê báo cáo, giao diện người dùng và kiểm tra dữ liệu trong cơ sở dữ liệu.

Kết quả kiểm thử cho thấy hệ thống đáp ứng được các nghiệp vụ chính của website bán sách. Các chức năng như đăng nhập, thêm/sửa/xóa dữ liệu quản trị, tạo đơn hàng, tính tổng tiền, lưu phương thức thanh toán, cập nhật tồn kho và thống kê doanh thu theo tháng hoạt động theo yêu cầu. Các trường hợp nhập thiếu dữ liệu, nhập sai định dạng, nhập dữ liệu trùng hoặc thao tác không hợp lệ cần được hệ thống kiểm tra và hiển thị thông báo rõ ràng để đảm bảo tính đúng đắn của dữ liệu.
