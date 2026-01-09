# TÀI LIỆU PHÂN TÍCH THIẾT KẾ HỆ THỐNG

-- Ngày 9/1/2026 - Nhiệm vụ : Viết mô tả quy trình ( quản lý sản phẩm )

## QUY TRÌNH QUẢN LÝ SẢN PHẨM

### I. Thêm sản phẩm mới

1. Người quản lý truy cập màn hình Quản lý sản phẩm
2. Chọn chức năng Thêm sản phẩm
3. Hệ thống sẽ hiển thị lên form giao diện nhập liệu
4. Nhập thông tin sản phẩm:
   * Tên sản phẩm
   * Danh mục
   * Giá nhập
   * Giá bán
   * Số lượng tồn kho ban đầu
5. Xác nhận lưu
6. Hệ thống:
   * Lưu sản phẩm vào cơ sở dữ liệu
   * Gán sản phẩm vào danh mục tương ứng
   * Hiển thị sản phẩm trong danh sách

### II. Sửa thông tin sản phẩm

1. Người dùng chọn một sản phẩm trong danh sách
2. Chọn Chỉnh sửa
3. Cập nhật thông tin cần thay đổi (giá, danh mục, số lượng,…)
4. Lưu thay đổi
5. Hệ thống:
   * Cập nhật dữ liệu
   * Ghi nhận lịch sử thay đổi

### III. Xóa sản phẩm

1. Người dùng chọn sản phẩm
2. Chọn Xóa
3. Hệ thống hiển thị hộp thoại xác nhận
4. Người dùng xác nhận xóa
5. Hệ thống:
   * Xóa sản phẩm khỏi danh sách
   * Không cho phép xóa nếu sản phẩm đang tồn tại trong đơn hàng (nếu áp dụng)

### IV. Phân loại theo danh mục

1. Mỗi sản phẩm được gán một danh mục khi tạo hoặc chỉnh sửa
2. Người dùng có thể:
   * Lọc sản phẩm theo danh mục
   * Tìm kiếm nhanh theo tên hoặc loại
3. Hệ thống hiển thị danh sách sản phẩm tương ứng

### V. Theo dõi giá nhập và giá bán

1. Giá nhập và giá bán được lưu riêng cho từng sản phẩm
2. Khi xem chi tiết sản phẩm:
   * Hệ thống hiển thị rõ giá nhập và giá bán
3. Hỗ trợ:
   * So sánh lợi nhuận
   * Phân tích doanh thu (nếu mở rộng)

### VI. Cảnh báo hết hàng / sắp hết hàng

1. Hệ thống theo dõi số lượng tồn kho theo thời gian thực
2. Khi:
   * Số lượng ≤ ngưỡng cảnh báo → Sắp hết hàng
   * Số lượng = 0 → Hết hàng
3. Hệ thống:
   * Hiển thị cảnh báo trên giao diện
   * Đánh dấu sản phẩm bằng màu sắc/trạng thái
   * Ngăn bán nếu sản phẩm đã hết hàng (nếu cấu hình)



## QUY TRÌNH QUẢN LÝ BÁN HÀNG

### I. Tạo đơn hàng

1. Nhân viên truy cập màn hình Bán hàng
2. Chọn hoặc tìm sản phẩm
3. Nhập số lượng cần bán
4. Sản phẩm được thêm vào đơn hàng
5. Hệ thống:
   * Tự động tính tổng tiền từng sản phẩm
   * Kiểm tra tồn kho

### II. Tính tiền tự động

1. Khi thêm/xóa/thay đổi số lượng sản phẩm:
   * Hệ thống tự động cập nhật:
2. Hiển thị tổng tiền cuối cùng theo thời gian thực

### III. Thanh toán

1. Nhân viên chọn  **phương thức thanh toán :**
   * Tiền mặt
   * Chuyển khoản
2. Nhập số tiền khách đưa (nếu thanh toán tiền mặt)
3. Hệ thống:
   * Tính tiền thừa
   * Xác nhận thanh toán thành công

### IV. In hóa đơn

1. Sau khi thanh toán:
   * Nhân viên chọnIn hóa đơn
2. Hệ thống:
   * Tạo hóa đơn chứa:
   * Gửi lệnh in đến máy in
3. Hóa đơn được lưu để:
   * Tra cứu lịch sử bán hàng
   * Báo cáo doanh thu
## 1.2.3. Hoạt động Quản lý Kho Hàng (Nhập – Xuất – Tồn – Hủy)

### • Quản lý Nhập hàng

* Khi hàng trong kho gần hết, **chủ quán hoặc người bán** sẽ liên hệ trực tiếp với **nhà cung cấp** để nhập thêm hàng.
* Khi hàng được giao đến quán:
  * Kiểm tra **số lượng** và  **tình trạng hàng hóa** .
  * Đối với các mặt hàng có **Hạn sử dụng (HSD)** như: sữa, nước giải khát, mì gói, bánh kẹo…, hệ thống cho phép nhập:
* Sau khi kiểm tra xong, người bán lập **Phiếu nhập hàng** trên hệ thống.
* Việc thanh toán cho nhà cung cấp có thể:
  * Thanh toán ngay
  * Hoặc ghi nhận **công nợ** (nếu mua thiếu)

### • Quản lý Tồn kho

* Hệ thống quản lý tồn kho  **chi tiết theo từng lô và hạn sử dụng** , không chỉ tổng số lượng.
* Điều này giúp chủ quán:
  * Biết chính xác mặt hàng nào **sắp hết hạn**
  * Hạn chế thất thoát do quên kiểm tra hàng tồn

### • Quản lý Xuất/Bán hàng

* Trong quán tạp hóa:
  * **Xuất kho chính là bán hàng cho khách**
  * Không phân tách kho chính – quầy như siêu thị lớn
* Khi bán hàng:
  * Người bán quét mã hoặc chọn sản phẩm
  * Hệ thống **tự động trừ tồn kho**
* Để giảm hàng hết hạn:
  * Hệ thống tự động áp dụng nguyên tắc **FIFO (Nhập trước – Xuất trước)**
  * Luôn ưu tiên trừ hàng thuộc **lô có HSD gần nhất**
* Chủ quán  **không cần chọn lô thủ công** , hệ thống xử lý tự động.

### • Quản lý hàng hỏng / hết hạn

* Hàng hỏng, hết hạn, móp méo, chuột cắn… là tình huống thường gặp trong quán tạp hóa.
* Định kỳ (cuối ngày hoặc vài ngày/lần), người bán:
  * Kiểm tra hàng trên kệ
  * Thu hồi các sản phẩm không còn bán được
* Khi phát hiện hàng hỏng:
  * Lập **Phiếu hủy hàng** trên hệ thống
* Sau khi xác nhận:
  * Hệ thống trừ số lượng này khỏi tồn kho
  * Ghi nhận  **chi phí thất thoát** , giúp chủ quán biết mình lỗ do đâu.

## 1.2.4. Hoạt động Quản lý Nhà Cung Cấp

### • Mục tiêu

Quản lý thông tin các **đầu mối bỏ sỉ** (đại lý nước ngọt, bánh kẹo, sữa, mì gói…) để:

* Nhập hàng nhanh
* Theo dõi công nợ
* Dễ so sánh giá và chất lượng hàng

### • Các chức năng chính

1. **Thêm nhà cung cấp mới**
   * Khi có mối bỏ sỉ mới
2. **Cập nhật thông tin nhà cung cấp**
   * Khi đổi số điện thoại, địa chỉ, người giao hàng
3. **Ngừng sử dụng nhà cung cấp**
   * Khi không còn nhập hàng nữa (không xóa để giữ lịch sử)

### • Thông tin cần quản lý

* Mã nhà cung cấp
* Tên nhà cung cấp / Tên đại lý
* Địa chỉ
* Số điện thoại
* Email (nếu có)
* Người liên hệ / Người giao hàng
* Danh sách các mặt hàng thường cung cấp
* Công nợ hiện tại (nếu có)
