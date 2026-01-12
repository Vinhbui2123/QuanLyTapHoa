# TÀI LIỆU PHÂN TÍCH THIẾT KẾ HỆ THỐNG

## I.Xác định yêu cầu

Quản Lý Tạp Hóa là một hệ thống quản lý cửa hàng tạp hóa được thiết kế để giúp các chủ cửa hàng nhỏ lẻ dễ dàng:

    -Quản lý hàng hóa và tồn kho

    -Theo dõi doanh thu bán hàng

    -Quản lý thông tin khách hàng

    -Tạo báo cáo kinh doanh

### 1. **Yêu cầu chức năng (Functional Requirements)**

**1.1. Quản lý sản phẩm**

    -Thêm sản phẩm mới.

    -Sửa thông tin sản phẩm (tên, giá, số lượng, danh mục…).

    -Xóa hoặc tạm ẩn sản phẩm khỏi danh sách bán.

    -Tìm kiếm và lọc sản phẩm theo tên, mã, danh mục.

**1.2. Quản lý kho hàng**

    -Nhập kho (cập nhật số lượng).

    -Xuất kho tự động khi bán hàng.

    -Cảnh báo hàng tồn kho thấp.

    -Ghi nhận lịch sử nhập – xuất kho.

    -Quản lý hạn sử dụng

**1.3. Quản lý hóa đơn**

- Lưu trữ hóa đơn theo ngày/tháng/năm.
- Tra cứu hóa đơn theo mã, thời gian, nhân viên bán.
- Xuất hóa đơn ra PDF hoặc Excel.
- Lịch sử chỉnh sửa hoặc trả hàng liên quan đến hóa đơn.

**1.4. Quản lý khách hàng**

    -Lưu thông tin khách hàng thân thiết.

**1.5. Quản lý nhà cung cấp**

    -Thêm và lưu thông tin nhà cung cấp.

    -Theo dõi các lần nhập hàng từ nhà cung cấp.

    -Ghi lịch sử nợ / thanh toán với nhà cung cấp.

**1.6. Báo cáo – Thống kê**

    -Báo cáo doanh thu theo ngày, tuần, tháng.

    -Báo cáo lãi – lỗ.

    -Báo cáo hàng tồn kho.

    -Biểu đồ sản phẩm bán chạy / bán chậm.

### 2. **Yêu cầu phi chức năng (Non-functional Requirements)**

**2.1. Hiệu năng**

    -Giao diện bán hàng phải xử lý nhanh, không bị giật lag.

**2.2. Bảo mật**

    -Phân quyền truy cập rõ ràng.

    -Mã hóa mật khẩu.

    -Lưu lịch sử thay đổi dữ liệu.

**2.3. Khả năng mở rộng**

    -Cho phép thêm module quản lý online.

**2.4. Tính thân thiện & dễ dùng**

    -Giao diện đơn giản dành cho chủ tiệm không rành công nghệ.

    -Thao tác tối đa 1–2 bước để hoàn tất một giao dịch bán hàng.

**2.5. Sao lưu dữ liệu**

    -Tự động backup dữ liệu.

    -Khôi phục dữ liệu khi có sự cố.

### 3. **Yêu cầu dữ liệu (Data Requirements)**

**3.1. Bảng sản phẩm (Products)**

    -Mã hàng

    -Tên hàng

    -Đơn giá

    -Số lượng tồn

    -Hạn sử dụng

    -Nhà cung cấp

**3.2. Bảng hóa đơn (Invoices)**

    -Mã hóa đơn

    -Ngày giờ

    -Tổng tiền

    -Hình thức thanh toán

### 4. **Yêu cầu tích hợp (Integration Requirements)**

    -Tích hợp ZaloPay, VietQR, MoMo nếu muốn thanh toán QR.

## I-Quy trình quản lý khách hàng

### 1. Tiếp nhận khách hàng

- Khách đến mua trực tiếp
- Nhân viên chào hỏi, tư vấn
- Ghi nhận nhu cầu mua hàng

### 2. Thu thập thông tin khách hàng

(Với khách quen / mua thường xuyên)

Thông tin cơ bản:

- Tên khách hàng
- Số điện thoại
- Địa chỉ (nếu giao hàng)
- Thói quen mua (mặt hàng thường mua)

  Ngoài ra có thể ghi:

- Sổ khách hàng
- File Excel
- Phần mềm quản lý bán hàng

### 3. Phân loại khách hàng

- **Khách lẻ** : mua không thường xuyên
- **Khách quen** : mua nhiều lần
- **Khách sỉ** : mua số lượng lớn
- **Khách nợ** (nếu có): mua trước – trả sau

### 4. Chăm sóc khách hàng

- Nhớ mặt, nhớ tên khách quen
- Ưu tiên phục vụ nhanh
- Giới thiệu sản phẩm mới
- Nhắc khuyến mãi, giảm giá
- Giao hàng tận nơi (nếu có)

### 5. Quản lý công nợ khách hàng (nếu bán thiếu)

1. Ghi rõ:
   - Tên khách
   - Ngày mua
   - Số tiền nợ
2. Theo dõi thời gian trả
3. Nhắc khách lịch sự
4. Cập nhật khi khách thanh toán

### 6. Tiếp nhận phản hồi – khiếu nại

- Lắng nghe ý kiến khách hàng
- Ghi nhận phản hồi
- Xin lỗi khi cần thiết
- Đổi/trả hàng lỗi
- Cải thiện dịch vụ

### 7. Đánh giá khách hàng định kỳ

- Tần suất mua hàng
- Tổng giá trị mua
- Mức độ hài lòng
- Khả năng trở thành khách trung thành

## II- Quy trình quản lý thống kê

### 1. Thống kê bán hàng hằng ngày

- Tổng số đơn bán
- Tổng doanh thu
- Sản phẩm bán chạy
- Sản phẩm bán chậm

  Ghi vào sổ hoặc phần mềm cuối ngày

### 2. Thống kê tồn kho

- Số lượng hàng còn lại
- Hàng sắp hết
- Hàng tồn lâu
- Hàng sắp hết hạn

Thực hiện theo:

- Ngày
- Tuần
- Tháng

### 3. Thống kê chi phí

- Tiền nhập hàng
- Tiền điện nước
- Lương nhân viên
- Chi phí phát sinh khác

### 4. Thống kê lợi nhuận

**Lợi nhuận = Doanh thu – Chi phí**

- Tính theo:
  - Ngày
  - Tháng
  - Quý

### 5. Báo cáo tổng hợp cho chủ quán

Nội dung báo cáo gồm:

- Doanh thu
- Lợi nhuận
- Hàng bán chạy
- Hàng cần nhập thêm
- Hàng tồn kho lâu

## 1.2.3.4.5.Đặc tả Yêu cầu và Nghiệp vụ Hệ thống

Hệ thống được thiết kế để đáp ứng các tiêu chuẩn về chức năng, hiệu năng và quy trình nghiệp vụ đặc thù của ngành bán lẻ tạp hóa như sau:

### Yêu cầu Phi chức năng (Non-functional Requirements)

- **An toàn và Bảo mật thông tin:**
  - Hệ thống đảm bảo cơ chế mã hóa dữ liệu quan trọng.
  - Đặc biệt, các dữ liệu về **doanh thu, lợi nhuận và giá vốn** được xếp loại tuyệt mật, chỉ cấp quyền truy cập cho nhóm đối tượng quản trị cấp cao.
- **Trải nghiệm người dùng (UX/UI):**
  - Giao diện được thiết kế khoa học, trực quan, giảm thiểu thao tác thừa để tăng tốc độ bán hàng.
  - Tích hợp bộ lọc đa chiều và công cụ tìm kiếm thông minh (theo tên hàng, mã vạch, mã phiếu...) giúp tra cứu dữ liệu tức thời.
- **Khả năng kết nối:**
  - Hệ thống hoạt động ổn định trên môi trường mạng nội bộ (LAN/Wifi).
  - Đảm bảo kết nối liền mạch với các thiết bị ngoại vi (máy in, két tiền, cân điện tử).

### Phân quyền Người dùng (User Roles)

Hệ thống áp dụng cơ chế phân quyền theo vai trò (RBAC) chặt chẽ:

1. **Quản trị viên (Admin):** Có toàn quyền hệ thống (Full Control), quản lý danh sách người dùng và cấu hình tham số phần mềm.
2. **Người Quản lý (Manager):** Truy cập các báo cáo quản trị, quản lý nhân sự và có quyền duyệt các phiếu nghiệp vụ quan trọng (phiếu nhập, phiếu hủy hàng).
3. **Thủ kho (Warehouse Keeper):** Thực hiện các tác vụ nhập/xuất hàng hóa, lập phiếu đề nghị hủy hàng và thực hiện kiểm kê kho định kỳ.
4. **Nhân viên Thu ngân (Cashier):** Quyền hạn bị giới hạn trong giao diện bán hàng (POS) để thực hiện thanh toán và in hóa đơn.
5. **Nhân viên Quầy cân (Fresh Food Staff):** Chỉ sử dụng giao diện tích hợp với cân điện tử để in tem nhãn cho hàng tươi sống.

### Yêu cầu Nghiệp vụ Chi tiết (Business Logic)

Hệ thống phải tuân thủ và tự động hóa các quy trình nghiệp vụ cốt lõi sau:

1. **Quản lý Lô và Hạn sử dụng (Batch & Expiry Management):**
   - Hệ thống **bắt buộc** người dùng (Thủ kho) phải nhập đầy đủ thông tin _Hạn sử dụng (Expiry Date)_ và _Mã lô (Batch ID)_ khi tạo phiếu nhập kho. Đây là điều kiện tiên quyết để lưu dữ liệu nhập kho.
2. **Tích hợp Cân điện tử (Hardware Integration):**
   - Hệ thống có khả năng kết nối với cân điện tử in tem nhãn qua mạng LAN/Wifi để đồng bộ danh mục hàng hóa xuống cân.
3. **Xử lý Mã vạch thông minh (Barcode Parsing):**
   - Tại quầy thu ngân, hệ thống tích hợp thuật toán tự động nhận diện và bóc tách dữ liệu từ mã vạch do cân in ra (loại mã vạch chứa thông tin khối lượng/giá tiền) để thêm vào giỏ hàng mà không cần nhập thủ công.
4. **Nguyên tắc Xuất kho FIFO (First-In, First-Out):**
   - Hệ thống tự động hóa quy trình trừ tồn kho theo nguyên tắc **"Nhập trước - Xuất trước"** . Khi bán hàng, hệ thống ưu tiên trừ số lượng của các lô hàng có hạn sử dụng gần nhất hoặc thời gian nhập sớm nhất.
5. **Cảnh báo Hàng cận date (Expiry Alerts):**
   - Cung cấp Dashboard hoặc hệ thống thông báo (Notification) tự động cảnh báo danh sách hàng hóa sắp hết hạn sử dụng để quản lý có phương án xử lý kịp thời.
6. **Quản lý Hủy hàng & Kiểm kê (Waste & Audit):**
   - Hỗ trợ quy trình lập và duyệt "Phiếu hủy hàng" cho sản phẩm hư hỏng/hết hạn.
   - Hệ thống tự động điều chỉnh số lượng tồn kho và ghi nhận lịch sử (Log) chính xác sau khi phiếu hủy hoặc phiếu kiểm kê được duyệt.
     -- Ngày 9/1/2026 - Nhiệm vụ : Viết mô tả quy trình ( quản lý sản phẩm )

## QUY TRÌNH QUẢN LÝ SẢN PHẨM

### I. Thêm sản phẩm mới

1. Người quản lý truy cập màn hình Quản lý sản phẩm
2. Chọn chức năng Thêm sản phẩm
3. Hệ thống sẽ hiển thị lên form giao diện nhập liệu
4. Nhập thông tin sản phẩm:
   - Tên sản phẩm
   - Danh mục
   - Giá nhập
   - Giá bán
   - Số lượng tồn kho ban đầu
5. Xác nhận lưu
6. Hệ thống:
   - Lưu sản phẩm vào cơ sở dữ liệu
   - Gán sản phẩm vào danh mục tương ứng
   - Hiển thị sản phẩm trong danh sách

### II. Sửa thông tin sản phẩm

1. Người dùng chọn một sản phẩm trong danh sách
2. Chọn Chỉnh sửa
3. Cập nhật thông tin cần thay đổi (giá, danh mục, số lượng,…)
4. Lưu thay đổi
5. Hệ thống:
   - Cập nhật dữ liệu
   - Ghi nhận lịch sử thay đổi

### III. Xóa sản phẩm

1. Người dùng chọn sản phẩm
2. Chọn Xóa
3. Hệ thống hiển thị hộp thoại xác nhận
4. Người dùng xác nhận xóa
5. Hệ thống:
   - Xóa sản phẩm khỏi danh sách
   - Không cho phép xóa nếu sản phẩm đang tồn tại trong đơn hàng (nếu áp dụng)

### IV. Phân loại theo danh mục

1. Mỗi sản phẩm được gán một danh mục khi tạo hoặc chỉnh sửa
2. Người dùng có thể:
   - Lọc sản phẩm theo danh mục
   - Tìm kiếm nhanh theo tên hoặc loại
3. Hệ thống hiển thị danh sách sản phẩm tương ứng

### V. Theo dõi giá nhập và giá bán

1. Giá nhập và giá bán được lưu riêng cho từng sản phẩm
2. Khi xem chi tiết sản phẩm:
   - Hệ thống hiển thị rõ giá nhập và giá bán
3. Hỗ trợ:
   - So sánh lợi nhuận
   - Phân tích doanh thu (nếu mở rộng)

### VI. Cảnh báo hết hàng / sắp hết hàng

1. Hệ thống theo dõi số lượng tồn kho theo thời gian thực
2. Khi:
   - Số lượng ≤ ngưỡng cảnh báo → Sắp hết hàng
   - Số lượng = 0 → Hết hàng
3. Hệ thống:
   - Hiển thị cảnh báo trên giao diện
   - Đánh dấu sản phẩm bằng màu sắc/trạng thái
   - Ngăn bán nếu sản phẩm đã hết hàng (nếu cấu hình)

## QUY TRÌNH QUẢN LÝ BÁN HÀNG

### I. Tạo đơn hàng

1. Nhân viên truy cập màn hình Bán hàng
2. Chọn hoặc tìm sản phẩm
3. Nhập số lượng cần bán
4. Sản phẩm được thêm vào đơn hàng
5. Hệ thống:
   - Tự động tính tổng tiền từng sản phẩm
   - Kiểm tra tồn kho

### II. Tính tiền tự động

1. Khi thêm/xóa/thay đổi số lượng sản phẩm:
   - Hệ thống tự động cập nhật:
2. Hiển thị tổng tiền cuối cùng theo thời gian thực

### III. Thanh toán

1. Nhân viên chọn **phương thức thanh toán :**
   - Tiền mặt
   - Chuyển khoản
2. Nhập số tiền khách đưa (nếu thanh toán tiền mặt)
3. Hệ thống:
   - Tính tiền thừa
   - Xác nhận thanh toán thành công

### IV. In hóa đơn

1. Sau khi thanh toán:
   - Nhân viên chọnIn hóa đơn
2. Hệ thống:
   - Tạo hóa đơn chứa:
   - Gửi lệnh in đến máy in
3. Hóa đơn được lưu để:
   - Tra cứu lịch sử bán hàng
   - Báo cáo doanh thu

## 1.2.3. Hoạt động Quản lý Kho Hàng (Nhập – Xuất – Tồn – Hủy)

### • Quản lý Nhập hàng

- Khi hàng trong kho gần hết, **chủ quán hoặc người bán** sẽ liên hệ trực tiếp với **nhà cung cấp** để nhập thêm hàng.
- Khi hàng được giao đến quán:
  - Kiểm tra **số lượng** và **tình trạng hàng hóa** .
  - Đối với các mặt hàng có **Hạn sử dụng (HSD)** như: sữa, nước giải khát, mì gói, bánh kẹo…, hệ thống cho phép nhập:
- Sau khi kiểm tra xong, người bán lập **Phiếu nhập hàng** trên hệ thống.
- Việc thanh toán cho nhà cung cấp có thể:
  - Thanh toán ngay
  - Hoặc ghi nhận **công nợ** (nếu mua thiếu)

### • Quản lý Tồn kho

- Hệ thống quản lý tồn kho **chi tiết theo từng lô và hạn sử dụng** , không chỉ tổng số lượng.
- Điều này giúp chủ quán:
  - Biết chính xác mặt hàng nào **sắp hết hạn**
  - Hạn chế thất thoát do quên kiểm tra hàng tồn

### • Quản lý Xuất/Bán hàng

- Trong quán tạp hóa:
  - **Xuất kho chính là bán hàng cho khách**
  - Không phân tách kho chính – quầy như siêu thị lớn
- Khi bán hàng:
  - Người bán quét mã hoặc chọn sản phẩm
  - Hệ thống **tự động trừ tồn kho**
- Để giảm hàng hết hạn:
  - Hệ thống tự động áp dụng nguyên tắc **FIFO (Nhập trước – Xuất trước)**
  - Luôn ưu tiên trừ hàng thuộc **lô có HSD gần nhất**
- Chủ quán **không cần chọn lô thủ công** , hệ thống xử lý tự động.

### • Quản lý hàng hỏng / hết hạn

- Hàng hỏng, hết hạn, móp méo, chuột cắn… là tình huống thường gặp trong quán tạp hóa.
- Định kỳ (cuối ngày hoặc vài ngày/lần), người bán:
  - Kiểm tra hàng trên kệ
  - Thu hồi các sản phẩm không còn bán được
- Khi phát hiện hàng hỏng:
  - Lập **Phiếu hủy hàng** trên hệ thống
- Sau khi xác nhận:
  - Hệ thống trừ số lượng này khỏi tồn kho
  - Ghi nhận **chi phí thất thoát** , giúp chủ quán biết mình lỗ do đâu.

## 1.2.4. Hoạt động Quản lý Nhà Cung Cấp

### • Mục tiêu

Quản lý thông tin các **đầu mối bỏ sỉ** (đại lý nước ngọt, bánh kẹo, sữa, mì gói…) để:

- Nhập hàng nhanh
- Theo dõi công nợ
- Dễ so sánh giá và chất lượng hàng

### • Các chức năng chính

1. **Thêm nhà cung cấp mới**
   - Khi có mối bỏ sỉ mới
2. **Cập nhật thông tin nhà cung cấp**
   - Khi đổi số điện thoại, địa chỉ, người giao hàng
3. **Ngừng sử dụng nhà cung cấp**
   - Khi không còn nhập hàng nữa (không xóa để giữ lịch sử)

### • Thông tin cần quản lý

- Mã nhà cung cấp
- Tên nhà cung cấp / Tên đại lý
- Địa chỉ
- Số điện thoại
- Email (nếu có)
- Người liên hệ / Người giao hàng
- Danh sách các mặt hàng thường cung cấp
- Công nợ hiện tại (nếu có)

## Phân tích thiết kế hệ thống theo UML

### 1. Các biểu đồ UseCase

#### 1.1 Xác định các Tác nhân

#### 1.2 Xác định các USECASE


| Nhóm chức năng (UC tổng thể)           | Use Case con                            | Mô tả                                                                                                                                                                                   | Tác nhân chính                                                 |
| :------------------------------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
|                                             | Đăng nhập                            | Xác thực người dùng (username/password) trước<br />khi cho phép truy cập hệ thống.                                                                                             | Người Quản trị, Người<br />Quản lý, Nhân viên Thu ngân |
| **1.Quản trị Hệ thống**           | Quản lý phân quyền người dùng    | **(** Thêm,sửa, xóa tài khoản) và gán quyền (vai trò)<br />cho người dùng                                                                                               | Người Quản trị                                                |
| **2. Quản lý Bán hàng**           | Thanh toán Hóa đơn                  | Ghi nhận các mặt hàng (quét mã vạch hàng khô và tính tổng tiền,<br />xử lý thanh toán, in hóa đơn.<br /> (Tự động trừ số lượng kho theo FIFO khi hoàn tất) | Nhân viên Thu ngân                                             |
| **3.Quản lý Kho hàng**            | Nhập hàng vào kho                    | Lập phiếu nhập kho. Bắt buộc ghi nhận thông tin<br />Mã lô Hàng, Ngày sản xuất, và Hạn sử dụng (HSD) <br />cho hàng thực phẩm                                         | Người Quản trị                                                |
|                                             | Xuất hàng ra quầy                    | Lập phiếu xuất hàng từ kho lưu trữ ra quầy kệ.<br />Hệ thống tự động đề xuất xuất từ Lô có HSD cũ nhất (FIFO).                                                  | Người Quản trị                                                |
| **4. Quản lý Dữ liệu nền tảng** | Quản lý Danh mục (Ngành hàng)      | Thêm, sửa, xóa các danh mục/ngành hàng                                                                                                                                             | Người Quản trị                                                |
|                                             | Quản lý Hàng hóa (Sản phẩm)       | Thêm, sửa, xóa thông tin hàng hóa<br />(Mã, Tên, Đơn giá, Đơn vị tính…). Bắt buộc gán hàng<br /> hóa vào một Danh mục (Ngành hàng).                           | Người Quản trị                                                |
|                                             | Quản lý Nhà cung cấp                | Thêm, sửa, xóa, vô hiệu hóa thông tin nhà cung cấp<br />(Tên, Địa chỉ, SĐT, Mặt hàng cung cấp...).                                                                      | Người Quản trị                                                |
|                                             | Quản lý Khách hàng                  | Thêm, sửa, xóa thông tin khách hàng , phân cấp                                                                                                                                    | Người Quản trị                                                |
| **5.Thống kê & Báo cáo**         | Xem Báo cáo Doanh thu                 | Thống kê doanh thu, số lượng hàng bán theo<br />tháng, quý.                                                                                                                     | Người Quản trị                                                |
|                                             | Xem Báo cáo Hàng sắp hết hạn      | Cảnh báo các Lô hàng sẽ hết hạn trong N ngày tới                                                                                                                                | Người Quản trị                                                |
|                                             | Xem Báo cáo Hàng hủy (Thất thoát) | Thống kê chi phí, số lượng hàng đã bị hủy                                                                                                                                      | Người Quản trị                                                |
|                                             |                                         |                                                                                                                                                                                           |                                                                   |

#### 1.3 Biều đồ USECASE tổng quát

<img src="./img/UC_QuanLyTapHoa.png">

#### 1.4 USECASE đăng nhập

#### 1.5 Gói quản trị hệ thống

<img src="img/UC_Quantrihethong.jpg" alt="">

| Tiêu đề                 | Nội dung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên USE CASE**        | Quản lý người dùng phân quyền                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Tác nhân chính**      | Người quản trị                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Mức**                 | 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Tiền điều kiện**      | Người quản trị đăng nhập thành công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Đảm bảo tối thiểu**   | Dữ liệu người dùng hiện tại không bị<br /> thay đổi nếu thao tác quản lý không hoàn <br />tất hoặc gặp lỗi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Đảm bảo thành công**  | Thông tin tài khoản và quyền hạn<br /> của người dùng được cập nhật chính xác và <br />nhất quán trong cơ sở dữ liệu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Kích hoạt**           | Người Quản trị chọn chức năng<br />"Quản lý người dùng và phân quyền".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Chuỗi sự kiện chính** | 1.Hệ thống hiển thị danh sách các tài khoản người dùng hiện có.<br />2.Người Quản trị lựa chọn một hành động (Extension Point):<br />   A1. Người Quản trị chọn "Thêm mới".<br />   A2. Người Quản trị nhập thông tin (Username, Mật khẩu mặc định, chọn Nhân viên liên kết).<br />   A3. Người Quản trị thực hiện [Gán quyền] (chọn Vai trò: Thu Ngân...).<br />   A4. Người Quản trị chọn "Lưu".<br />   A5. Hệ thống kiểm tra tính hợp lệ (Username không trùng) và tạo tài khoản mới.<br />   B1. Người Quản trị chọn một tài khoản từ danh sách và chọn "Sửa".<br />   B2. Người Quản trị thay đổi thông tin, cập nhật Vai trò ([Gán quyền]) <br />hoặc Trạng thái (Hoạt động/Vô hiệu hóa).<br />   B3. Người Quản trị chọn "Lưu".<br />   B4. Hệ thống cập nhật thông tin tài khoản.<br />   C1. Người Quản trị chọn một tài khoản từ danh sách và chọn "Xóa".<br />   C2. Hệ thống yêu cầu xác nhận việc xóa.<br />   C3. Người Quản trị xác nhận.<br />   C4. Hệ thống kiểm tra ràng buộc dữ liệu và thực hiện xóa tài khoản. |
| **Ngoại lệ**            | **A5a. Username đã tồn tại (Khi thêm mới):**<br />    A5a.1. Hệ thống thông báo lỗi và yêu cầu nhập Username khác.<br />**C4a. Xóa tài khoản đã phát sinh giao dịch (Ví dụ: đã lập hóa đơn, phiếu nhập):**<br />    C4a.1. Hệ thống không cho phép xóa cứng để bảo toàn dữ liệu lịch sử, <br />khuyến nghị sử dụng chức năng "Vô hiệu hóa" (trong phần Sửa tài khoản).<br />**C4b. Xóa tài khoản đang đăng nhập:**<br />    C4b.1. Hệ thống từ chối yêu cầu xóa tài khoản của                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
