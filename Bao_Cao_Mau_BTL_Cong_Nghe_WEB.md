SBỘ GIÁO DỤC VÀ ĐÀO TẠO
TRƯỜNG ĐẠI HỌC THĂNG LONG
BÁO CÁO BÀI TẬP LỚN
MÔN CÔNG NGHỆ WEB
Đề tài: Xây dựng website bán sách
Hà Nội, 05-2025
Giảng viên hướng dẫn: Tân Văn Sơn
Sinh viên thực hiện: Nhóm 4
Nguyễn Thị Thu - A47940
Nguyễn Thị Thảo My – A48140
Nguyễn Hữu Hoàn – A48146
Đinh Tuấn Anh - 47866
Lớp IT333.03
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 1/38
```
LỜI MỞ ĐẦU
Trong thời đại công nghệ số phát triển mạnh mẽ, việc ứng dụng công nghệ thông t
vào hoạt động kinh doanh và mua sắm trực tuyến ngày càng trở nên phổ biến. Các webs
thương mại điện tử đóng vai trò quan trọng trong việc kết nối giữa nhà cung cấp và kh
hàng, đặc biệt trong lĩnh vực bán lẻ như sách – một sản phẩm thiết yếu phục vụ cho nhu
học tập và phát triển tri thức.
Với mong muốn tiếp cận và thực hành những kiến thức đã học về HTML, CS
JavaScript và thiết kế giao diện web, nhóm chúng em đã thực hiện bài tập lớn với đề
“Thiết kế giao diện website bán sách”. Đề tài hướng đến việc xây dựng một giao diện thân
thiện, trực quan, giúp người dùng dễ dàng tìm kiếm và lựa chọn các đầu sách phù hợp, đ
thời thể hiện được tính chuyên nghiệp, hiện đại của một trang thương mại điện tử.
Bài báo cáo này trình bày toàn bộ quá trình thực hiện đề tài, từ khâu phân tích yêu c
thiết kế giao diện đến đánh giá hiệu quả của website. Mặc dù vẫn còn nhiều hạn chế do
hạn thời gian và kiến thức, nhóm chúng em đã nỗ lực hoàn thành đề tài với tinh thần ngh
túc và trách nhiệm cao.
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 2/38
```
MỤC LỤC
CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI............................................................................1
1.1. Lý do chọn đề tài...................................................................................................... 1
1.2. Mục tiêu nghiên cứu................................................................................................. 1
1.3. Kết quả mong muốn đạt được.................................................................................1
CHƯƠNG 2. CÔNG CỤ VÀ NGÔN NGỮ SỬ DỤNG................................................3
2.1. Ngôn ngữ sử dụng....................................................................................................3
2.1.1. HTML5...................................................................................................3
2.1.2. CSS.........................................................................................................3
2.1.3. JavaScript...............................................................................................3
2.1.4. ReactJS...................................................................................................4
2.1.5. Bootstrap................................................................................................4
2.1.6. JSON Server............................................................................................4
2.2. Công cụ.....................................................................................................................4
2.2.1. Visual Studio Code..................................................................................4
2.2.2. Microsoft Word.......................................................................................5
CHƯƠNG 3. GIAO DIỆN WEBSITE VÀ CHỨC NĂNG..........................................6
3.1. Đặc tả chức năng các trang website........................................................................6
3.2. Chức năng website của admin.................................................................................9
3.3. Giao diện website....................................................................................................13
3.3.1. Header..................................................................................................13
3.3.2. Footer...................................................................................................14
3.3.3. Main content.........................................................................................14
3.3.4. Trang chi tiết sản phẩm........................................................................15
3.3.5. Trang đăng ký.......................................................................................16
3.3.6. Trang đăng nhập...................................................................................17
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 3/38
```
3.3.7. Cách đăng xuất.....................................................................................18
3.3.8. Các trang danh mục sách......................................................................19
3.3.9. Giỏ hàng...............................................................................................22
3.4. Giao diện quản lý của admin.................................................................................23
3.4.1. Trang quản lý danh mục.......................................................................23
3.4.2. Trang quản lý tài khoản........................................................................25
3.4.3. Trang quản lý sách...............................................................................26
3.4.4. Trang thêm sách mới............................................................................28
CHƯƠNG 4. KẾT LUẬN.............................................................................................29
4.1. Thời gian triển khai đề tài.....................................................................................29
4.2. Mức độ hoàn thành của đề tài...............................................................................30
4.3. Các vấn đề đã làm được.........................................................................................30
4.4. Các vấn đề chưa làm được.....................................................................................30
4.5. Những khó khăn gặp phải và cách giải quyết......................................................30
4.6. Những bài học rút ra trong quá trình thực hiện đề tài........................................31
4.7. Hướng phát triển của đề tài trong tương lai........................................................31
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 4/38
```
DANH MỤC HÌNH
Hình 3.1 Header.................................................................................................................... 13
Hình 3.2 Footer..................................................................................................................... 14
Hình 3.3 Main content phần đầu...........................................................................................14
Hình 3.4 Main content phần sau............................................................................................15
Hình 3.5 Trang chi tiết sách “Đắc nhân tâm”........................................................................15
Hình 3.6 Mô tả sách “Đắc nhân tâm”....................................................................................16
Hình 3.7 Trang đăng ký........................................................................................................16
Hình 3.8 Trang đăng ký khi đăng kí thành công...................................................................17
Hình 3.9 Trang đăng nhập.....................................................................................................17
Hình 3.10 Trang đăng nhập khi nhập sai...............................................................................18
Hình 3.11 Cách đăng xuất.....................................................................................................18
Hình 3.12 Trang sách tài chính.............................................................................................19
Hình 3.13 Trang sách kĩ năng...............................................................................................19
Hình 3.14 Khi tìm kiếm sách”Đắc nhân tâm”.......................................................................20
Hình 3.15 Trang sách kinh doanh.........................................................................................20
Hình 3.16 Trang sách tài chính.............................................................................................21
Hình 3.17 Trang sách Marketing...........................................................................................21
Hình 3.18 Giỏ hàng...............................................................................................................22
Hình 3.19 Quản lý danh mục................................................................................................23
Hình 3.20 Nhập dữ liệu để thêm mới danh mục....................................................................23
Hình 3.21 Thông báo khi thêm thành công...........................................................................24
Hình 3.22 Thông báo không thể xoá danh mục đang được sử dụng trong sách....................24
Hình 3.23 Thông báo xoá danh mục không được sử dụng trong sách...................................25
Hình 3.24 Quản lý tài khoản................................................................................................25
Hình 3.25 Quản lý sách.........................................................................................................26
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 5/38
```
Hình 3.26 Khi bấm nút sửa trong danh sách.........................................................................26
Hình 3.27 Xem mô tả sách ở trang quản lý sách...................................................................27
Hình 3.28 Thông báo xác nhận lưu thay đổi thông tin sách..................................................27
Hình 3.29 Thêm sách mới.....................................................................................................28
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 6/38
```
DANH MỤC BẢNG
Bảng 3.1. Chức năng trang danh mục sách.............................................................................6
Bảng 3.2 Chức năng trang chi tiết sản phẩm...........................................................................6
Bảng 3.3 Chức năng trang giỏ hàng........................................................................................7
Bảng 3.4 Chức năng trang đăng ký.........................................................................................8
Bảng 3.5 Chức năng trang đăng nhập.....................................................................................9
Bảng 3.6 Chức năng quản lý sách...........................................................................................9
Bảng 3.7 Chức năng trang quản lý tài khoản.........................................................................10
Bảng 3.8 Chức năng trang quản lý danh mục........................................................................11
Bảng 3.9 Chức năng thêm sách ở website admin..................................................................12
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 7/38
```
CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI
1.1. Lý do chọn đề tài
Trong quá trình học tập môn Thiết kế Web, chúng em nhận thấy việc thực hành
thông qua một đề tài thực tế là rất cần thiết để củng cố kiến thức và nâng cao kỹ năng.
Thị trường sách hiện nay đang dần chuyển dịch mạnh mẽ sang môi trường số, trong đó
các website bán sách đóng vai trò quan trọng trong việc phân phối và tiếp cận người đọc.
Chúng em lựa chọn thiết kế giao diện cho một website vì đâybán sách marketing
là một mảng sách có nhu cầu cao đối với sinh viên, người đi làm và doanh nghiệp –
những người luôn tìm kiếm tri thức trong lĩnh vực kinh doanh và tiếp thị. Ngoài ra, giao
diện của một website bán sách marketing cũng đòi hỏi sự chuyên nghiệp, dễ đọc và điều
hướng thuận tiện – đây là một thách thức thú vị về mặt thiết kế.
Đề tài không chỉ giúp chúng em áp dụng lý thuyết đã học vào thực tiễn mà còn rèn
luyện tư duy thiết kế, khả năng phân tích nhu cầu người dùng, cũng như học cách tổ chức
nội dung và bố cục hợp lý cho một trang web thương mại điện tử hiện đại.
1.2. Mục tiêu nghiên cứu
Website sachtrading.com được xây dựng nhằm cung cấp một nền tảng bán sách
marketing trực tuyến chuyên biệt, giúp người dùng dễ dàng tiếp cận các đầu sách chất
lượng, nội dung thực tiễn và cập nhật theo xu hướng. Giao diện được thiết kế thân thiện,
dễ sử dụng, phù hợp với mọi đối tượng — từ sinh viên đến người đi làm.
Mục tiêu chính là tạo nên một website với bố cục rõ ràng, hình ảnh đẹp, thông tin
sách đầy đủ, dễ dàng tìm kiếm và thao tác. Người dùng có thể xem chi tiết sản phẩm, lọc
theo danh mục, giá cả, và tìm đúng cuốn sách họ cần chỉ trong vài cú nhấp chuột.
Website còn hướng đến việc tối ưu trải nghiệm người dùng trên mọi thiết bị, từ máy
tính đến điện thoại, đảm bảo sự tiện lợi, nhanh chóng và hiệu quả trong quá trình tra cứu
và mua sắm.
1.3. Kết quả mong muốn đạt được
Xây dựng hoàn chỉnh giao diện website bán sách marketing với các trang chức
năng cơ bản như: trang chủ, trang danh mục sản phẩm, trang chi tiết sản phẩm và trang
liên hệ.
1
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 8/38
```
Thiết kế giao diện đẹp mắt, thân thiện với người dùng, đảm bảo tính trực quan,
dễ sử dụng cho cả người dùng phổ thông và người mua sách chuyên ngành.
Đảm bảo website có khả năng hiển thị tốt trên nhiều thiết bị như máy tính, máy
```
tính bảng và điện thoại di động (responsive design).
```
Ứng dụng hiệu quả các kiến thức đã học trong môn học Thiết kế Web như
HTML, CSS, JavaScript để tạo ra sản phẩm có tính thực tế.
Nâng cao kỹ năng làm việc nhóm và tư duy thiết kế qua việc phân chia công
việc, hợp tác và đóng góp ý tưởng trong suốt quá trình thực hiện.
Xây dựng nền tảng giao diện có thể phát triển thêm trong tương lai, như tích
hợp chức năng giỏ hàng, thanh toán và quản lý đơn hàng.
2
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 9/38
```
CHƯƠNG 2. CÔNG CỤ VÀ NGÔN NGỮ SỬ DỤNG
2.1. Ngôn ngữ sử dụng
2.1.1. HTML5
HTML5 là phiên bản mới nhất của ngôn ngữ đánh dấu siêu văn bản HTML
```
(Hypertext Markup Language), được sử dụng để xây dựng cấu trúc cơ bản cho trang web.
```
HTML5 không chỉ kế thừa những đặc điểm cốt lõi từ các phiên bản trước, mà còn bổ
sung thêm nhiều thẻ ngữ nghĩa mới như , , , giúp tăng khả<header> <footer> <article> <section>
năng tổ chức nội dung và cải thiện khả năng truy cập của trang web.
Trong bài tập lớn này, nhóm sử dụng HTML5 để xây dựng phần khung chính cho
website bán sách marketing. Các thành phần như tiêu đề, menu điều hướng, danh sách
sản phẩm, hình ảnh, mô tả sách... đều được tổ chức bằng các thẻ HTML có cấu trúc rõ
ràng. Việc sử dụng đúng thẻ ngữ nghĩa không chỉ giúp mã nguồn dễ đọc mà còn hỗ trợ
tối ưu SEO và khả năng truy cập cho người dùng. HTML5 giúp nhóm tạo ra một giao
diện nhất quán, dễ bảo trì và có thể hiển thị tốt trên mọi trình duyệt hiện đại.
2.1.2. CSS
```
CSS (Cascading Style Sheets) là ngôn ngữ định kiểu được sử dụng để thiết kế giao
```
diện trang web. CSS giúp kiểm soát màu sắc, bố cục, font chữ, kích thước và nhiều yếu tố
hiển thị khác của các phần tử HTML. Với phiên bản mới nhất là CSS3, nhà phát triển có
```
thể áp dụng nhiều hiệu ứng nâng cao như đổ bóng, bo góc, chuyển động (animation), và
```
đặc biệt là khả năng responsive – hiển thị linh hoạt trên nhiều loại màn hình và thiết bị
khác nhau.
Sự kết hợp giữa HTML và CSS tạo nên một trang web vừa có cấu trúc rõ ràng, vừa
có giao diện trực quan và đẹp mắt. CSS còn cho phép tách biệt nội dung và hình thức
trình bày, giúp quá trình bảo trì và nâng cấp trang web trở nên dễ dàng hơn.
2.1.3. JavaScript
JavaScript là ngôn ngữ lập trình phía client được sử dụng rộng rãi để tạo ra các
tương tác động trên trang web. Trong dự án này, nhóm sử dụng JavaScript để xử lý các
sự kiện người dùng như click chuột, nhập liệu, và thay đổi giao diện theo thời gian thực.
```
Ngoài ra, JavaScript còn giúp nhóm thao tác với DOM (Document Object Model) để hiển
```
thị hoặc ẩn nội dung, cập nhật dữ liệu mà không cần tải lại trang.
3
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 10/38
```
Nhờ JavaScript, website trở nên sinh động, dễ sử dụng và mang lại trải nghiệm tốt
hơn cho người dùng. Kết hợp cùng HTML5 và CSS3, JavaScript là công cụ không thể
thiếu giúp hoàn thiện giao diện người dùng một cách chuyên nghiệp.
2.1.4. ReactJS
ReactJS là thư viện JavaScript phổ biến do Facebook phát triển, được sử dụng để
xây dựng giao diện người dùng dạng component – giúp tách nhỏ giao diện thành các
phần có thể tái sử dụng. Nhóm đã áp dụng ReactJS để xây dựng một số thành phần giao
diện có tính tương tác cao như danh sách sách, giỏ hàng, và form nhập liệu.
Việc sử dụng React giúp mã nguồn dễ tổ chức, bảo trì và phát triển thêm các tính
năng mới trong tương lai. React còn tối ưu việc render giao diện nhờ cơ chế Virtual
DOM, giúp cải thiện hiệu năng và tốc độ tải trang.
2.1.5. Bootstrap
Để tiết kiệm thời gian thiết kế và đảm bảo tính nhất quán cho giao diện, nhóm đã
tích hợp Bootstrap – một framework CSS phổ biến. Bootstrap cung cấp sẵn nhiều lớp
```
định dạng (class) và thành phần giao diện như button, form, card, navbar,... giúp nhóm dễ
```
dàng xây dựng giao diện hiện đại mà không cần viết quá nhiều CSS từ đầu.
2.1.6. JSON Server
JSON Server là ngôn ngữ đơn giản nhưng rất hiệu quả dùng để mô phỏng một
REST API từ dữ liệu định dạng JSON. Đây là ngôn ngữ lý tưởng cho việc phát triển
frontend khi backend chưa hoàn thiện, hoặc trong các dự án nhỏ, học tập. JSON Server
```
cho phép tạo một server giả lập đầy đủ các chức năng CRUD (Create, Read, Update,
```
```
Delete) chỉ với một file JSON duy nhất.
```
2.2. Công cụ
2.2.1. Visual Studio Code
```
Visual Studio Code (VS Code) là trình soạn thảo mã nguồn miễn phí do Microsoft
```
phát triển. Đây là công cụ được sử dụng phổ biến nhất hiện nay trong lập trình web nhờ
giao diện thân thiện, hỗ trợ nhiều ngôn ngữ và có hệ thống plugin đa dạng. Đặc biệt, VS
Code hỗ trợ rất tốt cho HTML và CSS với các tính năng như: tự động gợi ý cú pháp,
highlight mã lệnh, định dạng code và xem trước giao diện thông qua tiện ích Live
Server.
4
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 11/38
```
Trong bài tập lớn này, nhóm sử dụng Visual Studio Code làm trình soạn thảo chính
trong suốt quá trình lập trình. VS Code hỗ trợ highlight cú pháp HTML và CSS, giúp dễ
dàng phát hiện và sửa lỗi khi viết mã. Bên cạnh đó, nhóm cài đặt tiện ích Live Server để
xem trực tiếp giao diện website mỗi khi cập nhật, từ đó rút ngắn thời gian thử nghiệm và
tinh chỉnh. Giao diện đơn giản, chức năng mạnh mẽ và khả năng tùy biến cao khiến VS
Code trở thành công cụ lập trình không thể thiếu trong dự án này.
2.2.2. Microsoft Word
Microsoft Word là phần mềm xử lý văn bản phổ biến được nhóm sử dụng để viết
báo cáo, tài liệu hướng dẫn, và tổng hợp nội dung trong quá trình phát triển dự án.
Word hỗ trợ các chức năng như định dạng văn bản, tạo bảng biểu, chèn hình ảnh, đánh số
trang, mục lục… giúp nhóm tạo ra bản báo cáo rõ ràng, chuyên nghiệp, dễ trình bày và
nộp bài.
5
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 12/38
```
CHƯƠNG 3. GIAO DIỆN WEBSITE VÀ CHỨC NĂNG
3.1. Đặc tả chức năng các trang website
Bảng 3.1. Chức năng trang danh mục sách
Mô tả chức năng Hiển thị danh sách các sách thuộc một danh mục c
thể để người dùng có thể xem và chọn mua.
Đối tượng Tất cả người dùng truy cập website.
Trigger User click vào một danh mục sách trên thanh menu
chính VD: “SÁCH BẤT ĐỘNG SẢN”
Tiền điều kiện + Website hoạt động bình thường.
- Cơ sở dữ liệu có dữ liệu sách thuộc danh mục đã
chọn.
Kết quả + Hiển thị toàn bộ sách thuộc danh mục đó kèm thông
```
tin: tên sách, giá cũ, giá mới, ảnh bìa, nút “vui lòng
```
```
đăng nhập” (nếu chưa đăng nhập).
```
- Nếu user đăng nhập, có thể thấy nút “Thêm vào giỏ
hàng”.
Bảng 3.2 Chức năng trang chi tiết sản phẩm
Mô tả chức năng Hiển thị thông tin chi tiết của sách, bao gồm hình ản
tên sách, giá gốc, giá giảm, quà tặng kèm, mô tả và
```
cho phép thêm số lượng tuỳ chỉnh( không vượt quá số
```
```
lượng trong kho) vào giỏ hàng.
```
Đối tượng Tất cả người dùng truy cập website.
Trigger User click vào một cuốn sách bất kỳ từ trang danh
sách để xem chi tiết.
6
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 13/38
```
Tiền điều kiện + Người dùng đã truy cập vào website.
- Dữ liệu sách đã được load từ cơ sở dữ liệu
Kết quả + Người dùng xem được thông tin chi tiết của sách.
- Người dùng có thể thêm sách theo số lượng vào giỏ
hàng bằng cách nhấn nút Thêm vào giỏ hàng.
Bảng 3.3 Chức năng trang giỏ hàng
Mô tả chức năng Hiển thị danh sách sản phẩm mà người dùng đã thêm
vào giỏ hàng. Cho phép người dùng thay đổi số
lượng, xoá sản phẩm khỏi giỏ, và tự động tính tổng
giá trị đơn hàng. Nếu sản phẩm đã hết hàng, hệ thống
sẽ không cho phép thêm sản phẩm đó vào giỏ.
```
Đối tượng Người dùng (khách hoặc đã đăng nhập) đang mua
```
hàng trên website.
Trigger Khi người dùng thêm sản phẩm vào giỏ hoặc truy cập
trang giỏ hàng.
Tiền điều kiện Người dùng đã chọn ít nhất một sản phẩm để mua.
Kết quả Giỏ hàng hiển thị đúng sản phẩm, số lượng và tổng
tiền, có thể thao tác xóa hoặc thanh toán thành công.
Nếu người dùng cố gắng thêm sản phẩm đã hết hàng,
hệ thống sẽ hiển thị thông báo và không thêm vào
giỏ.
Bảng 3.4 Chức năng trang đăng ký
Mô tả chức năng Cho phép người dùng tạo tài khoản mới trên hệ thốn
bằng cách nhập tên đăng nhập, mật khẩu và xác nhận
7
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 14/38
```
mật khẩu.
Đối tượng Người dùng muốn đăng ký mới.
```
Trigger + Người dùng truy cập vào trang đăng ký (VD: click
```
vào "Đăng ký" ở góc phải hoặc đường dẫn tương
```
ứng).
```
- Người dùng truy cập từ phần đăng kí ở trang đăng
nhập
Tiền điều kiện + website hoạt động bình thường
- người dùng chưa đăng nhập
```
Luồng chính 1.Người dùng nhập tên đăng nhập (username).
```
2.Nhập mật khẩu.
3. Nhập lại mật khẩu để xác nhận.
4. Nhấn nút "Đăng ký".
5. Nếu hợp lệ, hệ thống tạo tài khoản và chuyển
hướng đến trang đăng nhập hoặc trang chính.
Luồng thay thế + Nếu hai mật khẩu không khớp → hiện thông bá
lỗi.
- Nếu tên đăng nhập đã tồn tại → hiện thông báo lỗi
- Nếu trường nhập còn trống → yêu cầu nhập đầy đủ
Kết quả + tài khoản mới được tạo
- người dùng được yêu cầu đăng nhập
Bảng 3.5 Chức năng trang đăng nhập
Mô tả chức năng Chức năng này cho phép người dùng đăng nhập hệ
thống bằng tên đăng nhập và mật khẩu. Nếu tài khoản
8
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 15/38
```
là admin, hệ thống sẽ chuyển hướng đến trang quản
trị.
Đối tượng Những user đã đăng ký tài khoản.
Trigger User click vào nút “Đăng nhập” tại màn hình đăng
nhập. Hoặc nhấn vào nút”vui lòng đăng nhập” ở các
trang danh mục sách
Tiền điều kiện User đã có tài khoản hợp lệ trong hệ thống.
Nhập đúng tên đăng nhập và mật khẩu
Kết quả Hệ thống xác thực thành công và chuyển hướng đến
trang chủ hoặc trang quản trị.
3.2. Chức năng website của admin
Bảng 3.6 Chức năng quản lý sách
Mô tả chức năng Chức năng này cho phép thực hiệnngười quản trị
các thao tác , , và thông tin sáchthêm chỉnh sửa xoá
trong hệ thống. Khi nhấn nút “Sửa”, dữ liệu sách sẽ
được chuyển sang trạng thái chỉnh sửa và hiển thị nút
```
“Lưu” để cập nhật. Mỗi thao tác (thêm, sửa, xoá) đều
```
hiển thị để người dùng dễ dàngthông báo xác nhận
nhận biết kết quả thực hiện.
```
Đối tượng Người dùng có quyền quản trị (admin).
```
Trigger Người dùng click vào nút để thêm mới,“Thêm sách”
hoặc click vào nút tại từng dòng sách“Sửa”/“Xoá”
trong bảng danh sách.
Tiền điều kiện User đã đăng nhập thành công vào hệ thống.
User được phân quyền quản lý sách
Kết quả Thêm: sách mới được hiển thị trong danh sách.
9
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 16/38
```
Sửa: thông tin sách được cập nhật sau khi nhấn
“Lưu”
thành công.
Xoá: sách bị xoá khỏi hệ thống và biến mất khỏi danh
sách hiển thị.
Mỗi thao tác đều kèm theo thông báo xác nhận
```
(toast message)
```
Bảng 3.7 Chức năng trang quản lý tài khoản
Mô tả chức năng Chức năng này cho phép người quản trị thực hiện
thêm mới, chỉnh sửa và xoá tài khoản người dùng
trong hệ thống. Khi nhấn vào nút , thông tin tài“Sửa”
khoản sẽ chuyển sang trạng thái có thể chỉnh sửa và
hiển thị nút để cập nhật.“Lưu”
```
Đối tượng Người dùng có quyền quản trị (admin).
```
Trigger Người dùng click vào nút “Thêm tài khoản” để
thêm mới, hoặc click vào nút hoặc tại“Sửa” “Xoá”
từng dòng tài khoản trong bảng danh sách.
Tiền điều kiện User đã đăng nhập thành công vào hệ thống.
User được phân quyền quản lý sách
Kết quả Khi thêm mới: tài khoản được thêm vào bảng danhsách bên trên.
Khi chỉnh sửa: thông tin tài khoản được cập nhật thành
công sau khi nhấn “Lưu”.
Khi xoá: tài khoản bị xoá khỏi hệ thống và không còn hiển
thị trong danh sách.
Mỗi thao tác đều hiển thị thông báo xác nhận
10
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 17/38
```
Bảng 3.8 Chức năng trang quản lý danh mục
Mô tả chức năng Chức năng này cho phép thực hiệnngười quản trị
các thao tác , , và danh mục sáchthêm chỉnh sửa xoá
trong hệ thống. Khi nhấn nút “Sửa”, các trường dữ
liệu sẽ chuyển sang trạng thái có thể nhập và hiển thị
nút “Lưu” để cập nhật thông tin danh mục. Mỗi thao
tác đều hiển thị giúp người dùngthông báo xác nhận
dễ dàng nhận biết kết quả thực hiện.
```
Đối tượng Người dùng có quyền quản trị (admin).
```
Trigger Người dùng click vào nút để“Thêm danh mục”
thêm mới, hoặc click vào nút tại từng“Sửa”/“Xoá”
dòng danh mục trong bảng danh sách.
Tiền điều kiện User đã đăng nhập thành công vào hệ thống.
User có quyền quản lý danh mục.
Kết quả Danh mục mới được thêm và hiển thị trong danh sách
danh mục bên trên.
Hoặc danh mục cũ được cập nhật lại thông tin nếu
người dùng sửa và nhấn “Lưu” thành công.
Xoá: danh mục bị xoá khỏi hệ thống và biến mất khỏ
danh sách hiển thị.
Mỗi thao tác đều hiển thị nhưthông báo xác nhận
“Thêm thành công”, “Cập nhật thành công” hoặc “Đã
xoá danh mục”.
Bảng 3.9 Chức năng thêm sách ở website admin
Mô tả chức năng Chức năng này cho phép người dùng thêm sách mớ
11
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 18/38
```
vào hệ thống. Người dùng điền đầy đủ thông tin sách
như mã sách, tên, tác giả, năm xuất bản, số lượng... và
nhấn nút "Thêm sách".
```
Đối tượng Người dùng có quyền quản trị (admin).
```
Trigger Người dùng click vào mục “+ Thêm sách mới” trong
thanh điều hướng bên trái.
Hoặc từ trang “Quản lý danh mục”, nếu chọn thêm
mới sách thì sẽ được chuyển đến trang này.
Tiền điều kiện User đã đăng nhập thành công vào hệ thống.
User có quyền quản lý danh mục.
Kết quả Sách được thêm thành công vào hệ thống.
Trang hiển thị thông báo xác nhận “Thêm sách thành
công”.
Người dùng có thể quay về danh sách sách để kiểm
tra.
12
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 19/38
```
3.3. Giao diện website
3.3.1. Header
H nh 3.1 Header
13
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 20/38
```
3.3.2. Footer
H nh 3.2 Footer
3.3.3. Main content
H nh 3.3 Main content phần đầu
14
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 21/38
```
H nh 3.4 Main content phần sau
3.3.4. Trang chi tiết sản phẩm
H nh 3.5 Trang chi tiết sách “Đắc nhân tâm”
15
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 22/38
```
H nh 3.6 Mô tả sách “Đắc nhân tâm”
3.3.5. Trang đăng ký
H nh 3.7 Trang đăng ký
16
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 23/38
```
H nh 3.8 Trang đăng ký khi đăng kí thành công
3.3.6. Trang đăng nhập
H nh 3.9 Trang đăng nhập
17
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 24/38
```
H nh 3.10 Trang đăng nhập khi nhập sai
3.3.7. Cách đăng xuất
H nh 3.11 Cách đăng xuất
18
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 25/38
```
3.3.8. Các trang danh mục sách
H nh 3.12 Trang sách tài chính
H nh 3.13 Trang sách kĩ năng
19
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 26/38
```
H nh 3.14 Khi t m kiếm sách”Đắc nhân tâm”
H nh 3.15 Trang sách kinh doanh
20
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 27/38
```
H nh 3.16 Trang sách tài chính
H nh 3.17 Trang sách Marketing
21
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 28/38
```
3.3.9. Giỏ hàng
H nh 3.18 Giỏ hàng
22
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 29/38
```
3.4. Giao diện quản lý của admin
3.4.1. Trang quản lý danh mục
H nh 3.19 Quản lý danh mục
H nh 3.20 Nhập dữ liệu để thêm mới danh mục
23
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 30/38
```
H nh 3.21 Thông báo khi thêm thành công
H nh 3.22 Thông báo không thể xoá danh mục đang được sử dụng trong sách
24
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 31/38
```
H nh 3.23 Thông báo xoá danh mục không được sử dụng trong sách
3.4.2. Trang quản lý tài khoản
H nh 3.24 Quản lý tài khoản
25
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 32/38
```
3.4.3. Trang quản lý sách
H nh 3.25 Quản lý sách
H nh 3.26 Khi bấm nút sửa trong danh sách
26
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 33/38
```
H nh 3.27 Xem mô tả sách ở trang quản lý sách
H nh 3.28 Thông báo xác nhận lưu thay đổi thông tin sách
27
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 34/38
```
3.4.4. Trang thêm sách mới
H nh 3.29 Thêm sách mới
28
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 35/38
```
CHƯƠNG 4. KẾT LUẬN
4.1. Thời gian triển khai đề tài
Nhóm bắt đầu triển khai đề tài từ ngày 23/4/2025 sau khi được chia nhóm.
Ngay từ những ngày đầu, nhóm đã cùng nhau lên ý tưởng và thảo luận về nội dung của
đề tài. Quá trình thực hiện được chia thành các giai đoạn cụ thể như sau:
```
  Giai đoạn 1: Phân tích yêu cầu (23/4 – 25/4/2025)
```
Tìm hiểu đề tài, xác định mục tiêu và phạm vi công việc.
Phân công vai trò cho từng thành viên.
Thu thập và phân tích yêu cầu chức năng của hệ thống.
```
  Giai đoạn 2: Thiết kế giao diện (26/4 – 28/4/2025)
```
Phác thảo bố cục giao diện người dùng.
Chọn màu sắc, font chữ, bố cục phù hợp với chức năng.
Tạo mockup hoặc wireframe ban đầu để thống nhất ý tưởng.
```
  Giai đoạn 3: Lập trình và phát triển chức năng (29/4 – 6/5/2025)
```
Bắt đầu viết mã theo từng module đã phân công.
Kiểm tra, sửa lỗi và hoàn thiện tính năng theo yêu cầu.
Thường xuyên họp nhóm để cập nhật tiến độ và hỗ trợ nhau.
```
  Giai đoạn 4: Viết báo cáo và chỉnh sửa sản phẩm (7/5 – 9/5/2025)
```
Tổng hợp nội dung báo cáo: mục tiêu, cách thực hiện, kết quả.
Chỉnh sửa giao diện, tối ưu chức năng và đảm bảo sản phẩm hoàn chỉnh.
Thực hiện kiểm thử cuối cùng.
```
  Giai đoạn 5: Chuẩn bị báo cáo và nộp sản phẩm (10/5/2025)
```
Rà soát toàn bộ báo cáo và sản phẩm lần cuối.
Chuẩn bị nội dung thuyết trình nếu có.
Nộp sản phẩm và báo cáo đúng thời hạn.
29
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 36/38
```
4.2. Mức độ hoàn thành của đề tài
Đến thời điểm nộp bài, nhóm đã hoàn thành toàn bộ các phần giao diện website bán
sách với đầy đủ các chức năng cơ bản. Các trang như danh mục sách, trang chi tiết sản
phẩm, đăng ký, đăng nhập, giỏ hàng và giao diện quản trị đều được triển khai theo đúng
kế hoạch. Dù còn một số tính năng nâng cao chưa được tích hợp, sản phẩm vẫn đảm bảo
được tính trực quan và dễ sử dụng.
Nhóm ước tính đã triển khai được khoảng 95% mục tiêu đề ra so với kế hoạch ban
đầu, trong đó các phần quan trọng nhất đều đã hoàn thiện và hoạt động ổn định.
4.3. Các vấn đề đã làm được
  Thiết kế bố cục giao diện người dùng cho toàn bộ trang web.
  Xây dựng trang đăng ký, đăng nhập hoạt động ổn định.
  Hiển thị chi tiết sản phẩm, xử lý chức năng thêm vào giỏ hàng.
  Triển khai giao diện quản lý dành cho admin với các chức năng quản lý danh
mục, tài khoản và sách.
  Hiển thị tương thích trên nhiều thiết bị nhờ áp dụng thiết kế responsive.
4.4. Các vấn đề chưa làm được
  Chưa tích hợp cơ sở dữ liệu thực tế để lưu thông tin người dùng, sản phẩm và
đơn hàng.
  Chưa có chức năng xử lý thanh toán và xác nhận đơn hàng.
4.5. Những khó khăn gặp phải và cách giải quyết
Khó khăn Hướng giải quyết
Thiết kế giao diện responsive gặp
nhiều khó khăn do chưa quen với CSS
Flexbox và Grid.
Nhóm đã chủ động tra cứu tài liệu trên
các trang như W3Schools, MDN, và
thực hành thêm để cải thiện kỹ năng.
Một số chức năng JavaScript bị lỗi khi
chạy thử do sai cú pháp hoặc chưa hiểu
rõ logic xử lý.
Nhóm sử dụng console.log để kiểm tra
lỗi, kiên trì debug và tìm giải pháp từ
các diễn đàn lập trình.
30
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 37/38
```
4.6. Những bài học rút ra trong quá trình thực hiện đề tài
  Nhóm hiểu rõ hơn quy trình xây dựng một website từ thiết kế giao diện đến
hiện thực hóa bằng mã HTML/CSS/JS.
  Kỹ năng làm việc nhóm, phối hợp và hỗ trợ lẫn nhau là yếu tố then chốt để
hoàn thành dự án.
  Rèn luyện tính kiên nhẫn, tư duy logic và chủ động tìm hiểu kiến thức khi gặp
vấn đề mới.
4.7. Hướng phát triển của đề tài trong tương lai
  Trong tương lai, nhóm mong muốn phát triển thêm các chức năng nâng cao
như: thanh toán trực tuyến, quản lý đơn hàng, thống kê doanh thu.
  Kết nối với hệ quản trị cơ sở dữ liệu để lưu thông tin người dùng và sản phẩm
một cách bền vững.
  Áp dụng công nghệ React hoặc một framework front-end hiện đại để tối ưu
hiệu suất và khả năng tái sử dụng mã nguồn.
31
5/20/26, 12:42 PM BÁO CÁO BÀI TẬP LỚN MÔN CÔNG NGHỆ WEB: XÂY DỰNG WEBSITE BÁN SÁCH
```
https://getthispdf.com 38/38
```