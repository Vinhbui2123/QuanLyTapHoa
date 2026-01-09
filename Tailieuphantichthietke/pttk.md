# TÀI LIỆU PHÂN TÍCH THIẾT KẾ HỆ THỐNG

-- Ngày 9/1/2026 - Nhiệm vụ : Viết mô tả quy trình ( quản lý sản phẩm )

## QUY TRÌNH QUẢN LÝ SẢN PHẨM

### I. Thêm sản phẩm mới

1. Người quản lý truy cập màn hình Quản lý sản phẩm
2. Chọn chức năng “Thêm sản phẩm”
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

---

### II. Sửa thông tin sản phẩm

1. Người dùng chọn một sản phẩm trong danh sách
2. Chọn **“Chỉnh sửa”**
3. Cập nhật thông tin cần thay đổi (giá, danh mục, số lượng,…)
4. Lưu thay đổi
5. Hệ thống:
   * Cập nhật dữ liệu
   * Ghi nhận lịch sử thay đổi (nếu có)

---

### III. Xóa sản phẩm

1. Người dùng chọn sản phẩm
2. Chọn “Xóa”
3. Hệ thống hiển thị hộp thoại xác nhận
4. Người dùng xác nhận xóa
5. Hệ thống:
   * Xóa sản phẩm khỏi danh sách
   * Không cho phép xóa nếu sản phẩm đang tồn tại trong đơn hàng (nếu áp dụng)

---

### IV. Phân loại theo danh mục

1. Mỗi sản phẩm được gán một danh mục khi tạo hoặc chỉnh sửa
2. Người dùng có thể:
   * Lọc sản phẩm theo danh mục
   * Tìm kiếm nhanh theo tên hoặc loại
3. Hệ thống hiển thị danh sách sản phẩm tương ứng

---

### V. Theo dõi giá nhập và giá bán

1. Giá nhập và giá bán được lưu riêng cho từng sản phẩm
2. Khi xem chi tiết sản phẩm:
   * Hệ thống hiển thị rõ giá nhập và giá bán
3. Hỗ trợ:
   * So sánh lợi nhuận
   * Phân tích doanh thu (nếu mở rộng)

---

### VI. Cảnh báo hết hàng / sắp hết hàng

1. Hệ thống theo dõi số lượng tồn kho theo thời gian thực
2. Khi:
   * Số lượng ≤ ngưỡng cảnh báo → **Sắp hết hàng**
   * Số lượng = 0 → **Hết hàng**
3. Hệ thống:
   * Hiển thị cảnh báo trên giao diện
   * Đánh dấu sản phẩm bằng màu sắc/trạng thái
   * Ngăn bán nếu sản phẩm đã hết hàng (nếu cấu hình)

2. 

## QUY TRÌNH QUẢN LÝ BÁN HÀNG

### I. Tạo đơn hàng

1. Nhân viên truy cập **màn hình Bán hàng**
2. Chọn hoặc tìm sản phẩm
3. Nhập số lượng cần bán
4. Sản phẩm được thêm vào đơn hàng
5. Hệ thống:
   * Tự động tính tổng tiền từng sản phẩm
   * Kiểm tra tồn kho

---

### II. Tính tiền tự động

1. Khi thêm/xóa/thay đổi số lượng sản phẩm:
   * Hệ thống tự động cập nhật:
     * Tổng tiền
     * Thuế / giảm giá (nếu có)
2. Hiển thị tổng tiền cuối cùng theo thời gian thực

---

### III. Thanh toán

1. Nhân viên chọn  **phương thức thanh toán** :
   * Tiền mặt
   * Chuyển khoản
   * Ví điện tử (nếu hỗ trợ)
2. Nhập số tiền khách đưa (nếu thanh toán tiền mặt)
3. Hệ thống:
   * Tính tiền thừa
   * Xác nhận thanh toán thành công

---

### IV. In hóa đơn

1. Sau khi thanh toán:
   * Nhân viên chọn **“In hóa đơn”**
2. Hệ thống:
   * Tạo hóa đơn chứa:
     * Thông tin cửa hàng
     * Danh sách sản phẩm
     * Tổng tiền
     * Thời gian giao dịch
   * Gửi lệnh in đến máy in
3. Hóa đơn được lưu để:
   * Tra cứu lịch sử bán hàng
   * Báo cáo doanh thu
