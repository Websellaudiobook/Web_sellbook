BỘ GIÁO DỤC VÀ ĐÀO TẠO
TRƯỜNG ĐẠI HỌC THĂNG LONG
BÁO CÁO BÀI TẬP LỚN
MÔN CÔNG NGHỆ WEB
Đề tài: Xây dựng website bán sách
Hà Nội, 05-2025
Giảng viên hướng dẫn: Tân Văn Sơn
Sinh viên thực hiện: Nhóm
Nguyễn Hữu Gia Bảo - A51286
Nguyễn Khắc Đại - A50764
Đỗ Đình Vinh - A51067
Đoàn Thế Thuận - A51048
Lớp IT333.03

LỜI MỞ ĐẦU
Trong thời đại công nghệ số phát triển mạnh mẽ, việc ứng dụng công nghệ thông tin vào hoạt động kinh doanh và mua sắm trực tuyến ngày càng trở nên phổ biến. Các website thương mại điện tử đóng vai trò quan trọng trong việc kết nối giữa nhà cung cấp và khách hàng, đặc biệt trong lĩnh vực bán lẻ như sách – một sản phẩm thiết yếu phục vụ cho nhu cầu học tập và phát triển tri thức.

Với mong muốn áp dụng kiến thức đã học về HTML, CSS, JavaScript và thiết kế giao diện web, nhóm chúng em đã thực hiện bài tập lớn với đề tài “Xây dựng website bán sách”. Đề tài hướng đến việc xây dựng một giao diện thân thiện, trực quan, giúp người dùng dễ dàng tìm kiếm và lựa chọn các đầu sách phù hợp, đồng thời thể hiện được tính chuyên nghiệp, hiện đại của một trang thương mại điện tử.

Bài báo cáo này trình bày toàn bộ quá trình thực hiện đề tài, từ khâu phân tích yêu cầu, lựa chọn công nghệ, đến đặc tả chức năng và trình bày giao diện. Mặc dù vẫn còn hạn chế do thời gian và kiến thức, nhóm chúng em đã nỗ lực hoàn thành đề tài với tinh thần nghiêm túc và trách nhiệm cao.

MỤC LỤC
CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI....................................................1
1.1. Lý do chọn đề tài..............................................................1
1.2. Mục tiêu nghiên cứu.........................................................1
1.3. Kết quả mong muốn đạt được.............................................1
CHƯƠNG 2. CÔNG CỤ VÀ NGÔN NGỮ SỬ DỤNG.......................3
2.1. Ngôn ngữ và thư viện.......................................................3
2.2. Công cụ phát triển............................................................4
CHƯƠNG 3. GIAO DIỆN WEBSITE VÀ CHỨC NĂNG.................6
3.1. Đặc tả chức năng các trang website......................................6
3.2. Chức năng website của admin.............................................9
3.3. Giao diện website............................................................13
3.4. Giao diện quản lý của admin.............................................23
CHƯƠNG 4. KẾT LUẬN.............................................................29
4.1. Thời gian triển khai đề tài................................................29
4.2. Mức độ hoàn thành của đề tài...........................................30
4.3. Các vấn đề đã làm được....................................................30
4.4. Các vấn đề chưa làm được................................................30
4.5. Những khó khăn gặp phải và cách giải quyết......................30
4.6. Những bài học rút ra trong quá trình thực hiện đề tài..........31
4.7. Hướng phát triển của đề tài trong tương lai.........................31

DANH MỤC HÌNH
Hình 3.1 Header
Hình 3.2 Footer
Hình 3.3 Main content phần đầu (Hero, Features)
Hình 3.4 Main content phần sau (Danh mục, Sách nổi bật)
Hình 3.5 Trang chi tiết sách
Hình 3.6 Mô tả sách và thông tin chi tiết
Hình 3.7 Trang đăng ký
Hình 3.8 Trang đăng ký khi đăng ký thành công
Hình 3.9 Trang đăng nhập
Hình 3.10 Trang đăng nhập khi nhập sai
Hình 3.11 Cách đăng xuất
Hình 3.12 Trang danh sách sách
Hình 3.13 Trang lọc theo danh mục
Hình 3.14 Tìm kiếm sách
Hình 3.15 Giỏ hàng
Hình 3.16 Trang thanh toán
Hình 3.17 Lịch sử mua hàng
Hình 3.18 Quản lý danh mục
Hình 3.19 Quản lý tài khoản
Hình 3.20 Quản lý sách
Hình 3.21 Cập nhật sách
Hình 3.22 Thêm sách mới
Hình 3.23 Quản lý đơn hàng
Hình 3.24 Quản lý mã giảm giá
Hình 3.25 Danh sách email nhận tin

DANH MỤC BẢNG
Bảng 3.1. Chức năng trang chủ
Bảng 3.2. Chức năng trang danh sách sách
Bảng 3.3. Chức năng trang chi tiết sách
Bảng 3.4. Chức năng trang giỏ hàng
Bảng 3.5. Chức năng trang thanh toán
Bảng 3.6. Chức năng trang đăng ký
Bảng 3.7. Chức năng trang đăng nhập
Bảng 3.8. Chức năng trang lịch sử đơn hàng
Bảng 3.9. Chức năng trang cá nhân (Profile)
Bảng 3.10. Chức năng trang Wishlist
Bảng 3.11. Chức năng Dashboard Admin
Bảng 3.12. Chức năng quản lý sách
Bảng 3.13. Chức năng trang quản lý tài khoản
Bảng 3.14. Chức năng trang quản lý danh mục
Bảng 3.15. Chức năng trang quản lý đơn hàng
Bảng 3.16. Chức năng trang quản lý mã giảm giá
Bảng 3.17. Chức năng quản lý email nhận tin

CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI
1.1. Lý do chọn đề tài
Trong quá trình học tập môn Công nghệ Web, nhóm nhận thấy việc triển khai một đề tài thực tế giúp củng cố kiến thức và nâng cao kỹ năng lập trình. Sách là một mặt hàng có nhu cầu cao, phù hợp để xây dựng mô hình thương mại điện tử từ cơ bản đến nâng cao. Vì vậy, nhóm chọn đề tài website bán sách để thực hành các kiến thức về giao diện, dữ liệu, quản lý người dùng và CRUD.

1.2. Mục tiêu nghiên cứu
- Xây dựng website bán sách trực tuyến đầy đủ chức năng cơ bản cho khách hàng.
- Xây dựng trang quản trị để quản lý sách, danh mục, đơn hàng, tài khoản, mã giảm giá và email nhận tin.
- Thiết kế giao diện hiện đại, dễ sử dụng và đáp ứng tốt trên nhiều thiết bị.

1.3. Kết quả mong muốn đạt được
- Website hoạt động theo mô hình SPA, điều hướng mượt, không tải lại trang.
- Có đầy đủ các trang: trang chủ, danh sách sách, chi tiết sách, giỏ hàng, thanh toán, lịch sử đơn hàng, đăng nhập/đăng ký, trang cá nhân, wishlist.
- Có hệ thống quản trị riêng để thực hiện CRUD và theo dõi dữ liệu toàn diện.

CHƯƠNG 2. CÔNG CỤ VÀ NGÔN NGỮ SỬ DỤNG
2.1. Ngôn ngữ sử dụng
2.1.1. HTML5
HTML5 được sử dụng để xây dựng cấu trúc chính của ứng dụng, cung cấp các thẻ ngữ nghĩa hỗ trợ SEO và khả năng truy cập tốt. Các thành phần như tiêu đề, menu điều hướng, khu vực hiển thị sách và form đều được tổ chức với cấu trúc rõ ràng.

2.1.2. CSS3
CSS3 được dùng để định dạng giao diện, điều chỉnh bố cục, màu sắc và tạo hiệu ứng chuyển động. Hệ thống biến CSS được định nghĩa trong file global để đảm bảo tính nhất quán và hỗ trợ responsive.

2.1.3. JavaScript
JavaScript đảm nhiệm xử lý logic phía client như tìm kiếm, lọc dữ liệu, cập nhật số lượng giỏ hàng, xác thực form và điều hướng trong SPA.

2.1.4. ReactJS
React được sử dụng để xây dựng giao diện theo mô hình component, tái sử dụng cao, dễ bảo trì. Cơ chế Virtual DOM giúp tối ưu hiệu năng và cập nhật giao diện nhanh.

2.1.5. React Router DOM
React Router DOM giúp điều hướng giữa các trang mà không cần reload, phù hợp với mô hình SPA.

2.1.6. JSON Server
JSON Server dùng để giả lập REST API từ file db.json, cho phép thao tác CRUD phục vụ quá trình phát triển frontend.

2.2. Công cụ
2.2.1. Visual Studio Code
VS Code là trình soạn thảo chính với khả năng hỗ trợ JSX, linting và nhiều tiện ích khác.

2.2.2. Vite
Vite là công cụ build và dev server cho React, khởi động nhanh và có HMR.

2.2.3. Node.js
Node.js cung cấp runtime để chạy JSON Server và các lệnh phát triển.

CHƯƠNG 3. GIAO DIỆN WEBSITE VÀ CHỨC NĂNG
3.1. Đặc tả chức năng các trang website
Trước khi đi vào từng chức năng, hệ thống được tổ chức theo kiến trúc SPA: React render giao diện, gọi API qua Axios, và dữ liệu được lấy từ JSON Server. Dựa trên cấu trúc trang web thực tế đã phát triển, các chức năng cho khách hàng được bổ sung và mô tả cực kỳ chi tiết như sau:

Bảng 3.1. Chức năng trang chủ (Home)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Trang chủ đóng vai trò như một bảng quảng cáo bao quát, hiển thị banner lớn có call-to-action (nút chuyển hướng mua sắm), hiển thị các danh mục sách nổi bật, sách bán chạy, sách mới phát hành. Đặc biệt có form nhập email đăng ký nhận bản tin khuyến mãi. |
| Đối tượng | Tất cả người dùng truy cập. |
| Trigger | User truy cập vào đường dẫn gốc `/` hoặc click vào logo website ở bất kì trang nào. |
| Tiền điều kiện | Hệ thống API backend hoạt động để tải banner và dữ liệu top sản phẩm. |
| Kết quả | Hiển thị giao diện trang chủ mượt mà, đầy đủ các mục (Hero, Features, Top Categories, Bestsellers). Khi nhấp vào các liên kết sách sẽ tự động chuyển hướng đến chi tiết cuốn sách đó. |

Bảng 3.2. Chức năng trang danh sách sách (Books)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Hiển thị toàn bộ danh sách sách trong cửa hàng. Cho phép người dùng lọc nâng cao: lọc theo từng danh mục cụ thể (tài chính, kỹ năng, marketing...), lọc theo khoảng giá, tìm kiếm sách theo tên, tác giả hoặc mô tả, sắp xếp theo tên (A-Z, Z-A) hoặc theo giá (cao - thấp, thấp - cao). Tích hợp chức năng phân trang (pagination) hiển thị số trang hợp lý để tối ưu hiệu suất tải. |
| Đối tượng | Tất cả người dùng. |
| Trigger | Truy cập `/books`, chọn "Sản phẩm" trên thanh menu, hoặc gõ từ khóa vào thanh tìm kiếm. |
| Tiền điều kiện | CSDL có dữ liệu sách được phân loại danh mục rõ ràng. |
| Kết quả | Danh sách hiển thị ngay lập tức cập nhật theo các bộ lọc mà người dùng vừa chọn. Giao diện lưới (grid) đẹp mắt thể hiện ảnh bìa, tên sách, giá gốc và giá khuyến mãi (nếu có). |

Bảng 3.3. Chức năng trang chi tiết sách (Book Detail)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Trình bày toàn bộ thông tin cụ thể của một cuốn sách bao gồm: Hình ảnh (hỗ trợ zoom/preview), tên sách, tác giả, nhà xuất bản, ngày phát hành, giá bán, mô tả nội dung chi tiết. Có bộ đếm số lượng để tăng giảm trước khi quyết định bấm nút "Thêm vào giỏ hàng" hoặc "Thêm vào Wishlist". Bên dưới hiển thị carousel các "Sản phẩm liên quan" cùng chuyên mục để kích cầu mua sắm. |
| Đối tượng | Tất cả người dùng. |
| Trigger | Click vào bất kỳ thẻ sản phẩm sách nào trên trang chủ, trang danh sách hoặc giỏ hàng. |
| Tiền điều kiện | ID của sách hợp lệ và tồn tại trên hệ thống. |
| Kết quả | Cung cấp thông tin đầy đủ nhất để khách hàng đưa ra quyết định mua hàng. Nếu người dùng chọn "Thêm vào giỏ hàng", một popup/toast notification sẽ hiện lên báo thành công, và icon giỏ hàng trên header sẽ cập nhật số lượng lập tức. |

Bảng 3.4. Chức năng trang giỏ hàng (Cart)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Hiển thị bảng chi tiết các sản phẩm người dùng đã chọn mua, bao gồm ảnh, tên, đơn giá. Cung cấp nút tăng giảm số lượng (+/-) cho từng mặt hàng (tự động tính lại tổng tiền từng dòng). Nút "Xóa" bên cạnh mỗi sản phẩm. Có khu vực nhập mã giảm giá (voucher) và áp dụng để tự động trừ tiền. Hiển thị bảng tóm tắt: Tạm tính, Phí giao hàng, Số tiền giảm, và Tổng cộng. Nút "Tiến hành thanh toán" để chuyển sang bước checkout. |
| Đối tượng | Người dùng mua hàng. |
| Trigger | Click vào biểu tượng giỏ hàng trên Header hoặc truy cập `/cart`. |
| Tiền điều kiện | Người dùng đã thêm ít nhất một sản phẩm vào giỏ. (Nếu giỏ hàng trống sẽ hiển thị thông báo "Giỏ hàng của bạn đang trống" và nút "Tiếp tục mua sắm"). |
| Kết quả | Tính toán tài chính chuẩn xác. Tổng tiền, phí ship và giảm giá được tính chính xác dựa theo số lượng thay đổi liên tục. |

Bảng 3.5. Chức năng trang thanh toán (Checkout)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Là bước cuối cùng trước khi chốt đơn. Yêu cầu người dùng điền đầy đủ thông tin giao hàng: Họ tên, Số điện thoại, Email (tự động điền nếu đã đăng nhập), Địa chỉ chi tiết, Tỉnh/Thành phố. Lựa chọn phương thức thanh toán (COD hoặc chuyển khoản). Hiển thị tóm tắt lại đơn hàng (danh sách sách, tổng tiền phải trả) bên cạnh form để người dùng rà soát lần cuối. |
| Đối tượng | Người dùng có tài khoản hoặc yêu cầu đăng nhập trước khi thanh toán. |
| Trigger | Click nút "Tiến hành thanh toán" từ trang giỏ hàng. |
| Tiền điều kiện | Giỏ hàng không được trống. Người dùng phải ở trạng thái đăng nhập (xử lý bởi ProtectedRoute). |
| Kết quả | Sau khi bấm "Đặt hàng", hệ thống sẽ lưu thông tin thành một record mới trong bảng Orders, làm trống giỏ hàng hiện tại, sau đó hiển thị thông báo "Đặt hàng thành công" và chuyển hướng đến trang Lịch sử đơn hàng. |

Bảng 3.6. Chức năng trang đăng ký (Register)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Thu thập thông tin người dùng muốn tham gia hệ thống: Họ tên, Email, Mật khẩu, Nhập lại mật khẩu, Số điện thoại. Xác thực (validation) nghiêm ngặt tại client-side: email phải đúng định dạng, mật khẩu phải mạnh, 2 mật khẩu phải khớp nhau. |
| Đối tượng | Người dùng khách (chưa có tài khoản). |
| Trigger | Truy cập `/register`. |
| Luồng chính | Nhập thông tin hợp lệ -> Bấm đăng ký. |
| Luồng thay thế | Email trùng, mật khẩu yếu -> Thông báo lỗi. |
| Kết quả | Tạo tài khoản thành công và chuyển hướng đăng nhập. |

Bảng 3.7. Chức năng trang đăng nhập (Login)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Cho phép người dùng nhập Email và Mật khẩu để xác thực. Có tính năng "Hiện/Ẩn mật khẩu" để tăng cường trải nghiệm. |
| Đối tượng | Người dùng đã đăng ký. |
| Trigger | Truy cập `/login`. |
| Kết quả | Lưu thông tin phiên đăng nhập vào LocalStorage. Nếu là User -> về Trang chủ. Nếu là Admin -> về Dashboard Quản trị. |

Bảng 3.8. Chức năng trang lịch sử đơn hàng (Orders)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Liệt kê tất cả các đơn hàng mà người dùng đã từng đặt. Mỗi đơn hàng hiển thị Mã đơn, Ngày đặt, Tổng tiền, Phương thức thanh toán, và Trạng thái hiện tại (Đang xử lý, Đang giao, Đã giao, Đã hủy). Hỗ trợ xem chi tiết. |
| Đối tượng | Người dùng đã đăng nhập. |
| Trigger | Truy cập thông qua menu tài khoản -> "Đơn hàng của tôi". |
| Kết quả | Người dùng nắm bắt được tiến trình đơn hàng minh bạch, rõ ràng. |

Bảng 3.9. Chức năng trang cá nhân (Profile)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Cho phép người dùng xem và cập nhật thông tin cá nhân cơ bản: Đổi Tên hiển thị, Số điện thoại, Địa chỉ giao hàng mặc định, Avatar. Hỗ trợ thay đổi mật khẩu an toàn. |
| Đối tượng | Người dùng đã đăng nhập. |
| Kết quả | Thông tin user được cập nhật trong CSDL và phản ánh ngay lập tức trên Header (tên, avatar). |

Bảng 3.10. Chức năng trang Wishlist (Yêu thích)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Lưu trữ các cuốn sách người dùng cảm thấy hứng thú nhưng chưa muốn mua ngay. Hỗ trợ nút "Thêm vào giỏ hàng" cực nhanh để đẩy sang bước thanh toán, hoặc nút "Xóa" để bỏ khỏi danh sách yêu thích. |
| Đối tượng | Người dùng đã đăng nhập. |
| Kết quả | Duy trì tệp khách hàng tiềm năng, giúp họ quay lại mua sắm cao hơn. |


3.2. Chức năng website của admin
Phần quản trị (Admin Panel) là khu vực tách biệt, được bảo vệ nghiêm ngặt chỉ cho phép tài khoản có quyền "admin" truy cập. Cấu trúc trang admin dùng thanh sidebar bên trái để điều hướng và vùng nội dung chính ở bên phải. Đã bổ sung chi tiết các chức năng quản lý toàn diện như sau:

Bảng 3.11. Chức năng Dashboard Admin
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Là trang tổng quan đầu tiên admin nhìn thấy khi đăng nhập. Sử dụng các biểu đồ (charts) và thẻ thông tin (cards) trực quan để thống kê: Tổng số doanh thu trong tháng, Tổng số đơn hàng thành công/đang chờ, Số lượng người dùng mới, và Top 5 sách bán chạy nhất. |
| Đối tượng | Admin. |
| Trigger | Truy cập `/admin` hoặc click "Dashboard" ở sidebar. |
| Kết quả | Cung cấp cái nhìn bao quát về tình hình kinh doanh của toàn bộ website trong nháy mắt. |

Bảng 3.12. Chức năng quản lý sách (Books Management)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Cho phép admin thực hiện thao tác CRUD hoàn chỉnh đối với sản phẩm sách. Hiển thị bảng danh sách sách (phân trang, tìm kiếm). Nút "Thêm Sách Mới" mở ra form chi tiết gồm: Tên sách, Tác giả, Giá nhập, Giá bán, NXB, Số trang, Mô tả dài, Tải ảnh lên hoặc dùng link ảnh, Chọn danh mục. Tính năng sửa và xóa (xác nhận trước khi xóa để tránh nhầm lẫn). |
| Đối tượng | Admin. |
| Trigger | Truy cập `/admin/books`. |
| Kết quả | Quản lý kho sách chuyên nghiệp. Ngay khi admin thêm sách mới, sách sẽ lập tức xuất hiện ngoài trang chủ của khách hàng. |

Bảng 3.13. Chức năng trang quản lý tài khoản (Users Management)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Hiển thị bảng liệt kê tất cả user đã đăng ký vào hệ thống. Các trường thông tin gồm: ID, Tên, Email, Số điện thoại, Vai trò (Role). Cho phép admin quyền lực thay đổi Role của một user (nâng cấp thành admin hoặc hạ quyền), có tính năng khóa/xóa tài khoản (ban user) nếu phát hiện gian lận. |
| Đối tượng | Admin. |
| Kết quả | Kiểm soát chặt chẽ quyền truy cập và dữ liệu khách hàng. |

Bảng 3.14. Chức năng trang quản lý danh mục (Categories Management)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Thêm, sửa, xóa các danh mục sách (VD: Tiểu thuyết, Kỹ năng sống, Kinh doanh). Bảng hiển thị ID, Tên danh mục, Số lượng sách đang thuộc danh mục đó. Nếu xóa một danh mục đang chứa sách, hệ thống sẽ cảnh báo không cho xóa hoặc yêu cầu chuyển sách sang danh mục khác trước. |
| Đối tượng | Admin. |
| Kết quả | Tổ chức phân loại sách gọn gàng, có hệ thống. |

Bảng 3.15. Chức năng trang quản lý đơn hàng (Orders Management)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Chức năng quan trọng nhất cho vận hành. Liệt kê toàn bộ đơn hàng khách đã đặt. Admin có thể click xem chi tiết từng đơn hàng (thông tin người nhận, địa chỉ, sách đã mua). Tính năng cập nhật trạng thái đơn hàng thông qua dropdown menu: "Đang chờ xử lý" -> "Đã xác nhận" -> "Đang giao" -> "Đã giao thành công" hoặc "Đã hủy". |
| Đối tượng | Admin. |
| Kết quả | Trạng thái được lưu vào CSDL và khách hàng có thể thấy ngay sự thay đổi trạng thái này bên trang lịch sử đơn hàng của họ. |

Bảng 3.16. Chức năng trang quản lý mã giảm giá (Discounts Management)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Tạo các chương trình khuyến mãi. Thêm mã voucher (ví dụ: `TET2025`), thiết lập phần trăm giảm (VD: 10%), hoặc số tiền giảm cố định (VD: 50.000đ). Cài đặt hạn sử dụng (ngày bắt đầu, ngày kết thúc) và số lượng lượt dùng tối đa. |
| Đối tượng | Admin. |
| Kết quả | Kích thích nhu cầu mua sắm. Khi khách hàng nhập mã hợp lệ ở trang giỏ hàng, hệ thống sẽ trừ tiền tự động dựa trên quy tắc admin đã thiết lập ở đây. |

Bảng 3.17. Chức năng quản lý email nhận tin (Subscribers)
| Thuộc tính | Mô tả |
|---|---|
| Mô tả chức năng | Thu thập và quản lý danh sách các email mà khách hàng đã nhập ở phần "Đăng ký nhận bản tin" dưới footer hoặc ở trang chủ. Liệt kê thời gian đăng ký. Hỗ trợ admin xuất file danh sách hoặc xóa email. |
| Đối tượng | Admin. |
| Kết quả | Xây dựng tệp data phục vụ cho chiến dịch Email Marketing sau này. |


3.3. Giao diện website
3.3.1. Header
Header gồm logo, thanh tìm kiếm, menu chính, giỏ hàng và menu tài khoản. Khi đăng nhập, menu hiển thị lịch sử mua hàng, yêu thích và quản trị (nếu là admin).

3.3.2. Footer
Footer chia thành các cột: thương hiệu, danh mục, hỗ trợ và liên hệ. Các liên kết giúp người dùng truy cập nhanh.

3.3.3. Main content
Trang chủ gồm Hero banner, các thẻ tính năng, danh mục sách, sách nổi bật, sách bán chạy và form đăng ký nhận tin.

3.3.4. Trang chi tiết sản phẩm
Hiển thị đầy đủ thông tin sách, giá bán, giá gốc, số lượng tồn kho, tab mô tả và thông tin chi tiết, kèm sách liên quan.

3.3.5. Trang đăng ký
Form đăng ký có kiểm tra độ mạnh mật khẩu, định dạng email và số điện thoại.

3.3.6. Trang đăng nhập
Form đăng nhập đơn giản, có chức năng hiện/ẩn mật khẩu.

3.3.7. Cách đăng xuất
Người dùng mở menu tài khoản trên header và chọn Đăng xuất.

3.3.8. Các trang danh mục sách
Trang danh sách sách hỗ trợ lọc theo danh mục, khoảng giá, sắp xếp và phân trang.

3.3.9. Giỏ hàng
Hiển thị danh sách sách đã chọn, thay đổi số lượng, áp mã giảm giá, tính tổng tiền và phí ship.

3.4. Giao diện quản lý của admin
3.4.1. Trang quản lý danh mục
Hiển thị bảng danh mục, hỗ trợ thêm/sửa/xóa bằng modal form.

3.4.2. Trang quản lý tài khoản
Quản lý user, phân quyền admin/user và cập nhật thông tin.

3.4.3. Trang quản lý sách
Danh sách sách với các thao tác thêm/sửa/xóa, hỗ trợ nhiều danh mục và ảnh URL/local.

3.4.4. Trang thêm sách mới
Form thêm sách bao gồm đầy đủ trường: tên, tác giả, mô tả, giá, danh mục, tồn kho, NXB, ngôn ngữ, ISBN và các cờ nổi bật/bán chạy.

3.4.5. Trang quản lý đơn hàng, mã giảm giá, email nhận tin
Các trang quản trị bổ trợ giúp theo dõi đơn hàng, cập nhật trạng thái và quản lý dữ liệu khuyến mãi.

CHƯƠNG 4. KẾT LUẬN
4.1. Thời Thời gian triển khai đề tài
Đề tài được triển khai xuyên suốt học phần với các giai đoạn: phân tích, thiết kế, xây dựng giao diện, tích hợp dữ liệu và hoàn thiện báo cáo.

4.2. Mức độ hoàn thành của đề tài
Đã hoàn thành các chức năng cơ bản của website bán sách và trang quản trị, đáp ứng yêu cầu bài tập lớn.

4.3. Các vấn đề đã làm được
- Xây dựng SPA với React và React Router.
- Tạo CRUD đầy đủ cho admin.
- Thiết kế giao diện hiện đại, responsive.
- Tối ưu trải nghiệm người dùng bằng thông báo và trạng thái loading.

4.4. Các vấn đề chưa làm được
- Chưa tích hợp thanh toán thực tế.
- Chưa triển khai bảo mật phía server do dùng JSON Server.

4.5. Những khó khăn gặp phải và cách giải quyết
- Dữ liệu JSON Server hạn chế query: giải quyết bằng lọc client-side.
- Đồng bộ state với localStorage: xử lý bằng Context và useEffect.

4.6. Những bài học rút ra trong quá trình thực hiện đề tài
- Kinh nghiệm tổ chức dự án theo component.
- Tư duy thiết kế luồng người dùng và quản trị dữ liệu.

4.7. Hướng phát triển của đề tài trong tương lai
- Tích hợp backend thật (Node.js/Express).
- Thanh toán online qua cổng thực tế.
- Thêm đánh giá, bình luận và gợi ý cá nhân hóa.