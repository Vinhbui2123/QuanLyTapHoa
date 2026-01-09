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

* Lưu trữ hóa đơn theo ngày/tháng/năm.
* Tra cứu hóa đơn theo mã, thời gian, nhân viên bán.
* Xuất hóa đơn ra PDF hoặc Excel.
* Lịch sử chỉnh sửa hoặc trả hàng liên quan đến hóa đơn.

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
