# TÀI LIỆU PHÂN TÍCH THIẾT KẾ HỆ THỐNG


## 1.2.3.4.5.Đặc tả Yêu cầu và Nghiệp vụ Hệ thống

Hệ thống được thiết kế để đáp ứng các tiêu chuẩn về chức năng, hiệu năng và quy trình nghiệp vụ đặc thù của ngành bán lẻ tạp hóa như sau:

### Yêu cầu Phi chức năng (Non-functional Requirements)

* **An toàn và Bảo mật thông tin:**
  * Hệ thống đảm bảo cơ chế mã hóa dữ liệu quan trọng.
  * Đặc biệt, các dữ liệu về **doanh thu, lợi nhuận và giá vốn** được xếp loại tuyệt mật, chỉ cấp quyền truy cập cho nhóm đối tượng quản trị cấp cao.
* **Trải nghiệm người dùng (UX/UI):**
  * Giao diện được thiết kế khoa học, trực quan, giảm thiểu thao tác thừa để tăng tốc độ bán hàng.
  * Tích hợp bộ lọc đa chiều và công cụ tìm kiếm thông minh (theo tên hàng, mã vạch, mã phiếu...) giúp tra cứu dữ liệu tức thời.
* **Khả năng kết nối:**
  * Hệ thống hoạt động ổn định trên môi trường mạng nội bộ (LAN/Wifi).
  * Đảm bảo kết nối liền mạch với các thiết bị ngoại vi (máy in, két tiền, cân điện tử).

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
   * Hệ thống **bắt buộc** người dùng (Thủ kho) phải nhập đầy đủ thông tin *Hạn sử dụng (Expiry Date)* và *Mã lô (Batch ID)* khi tạo phiếu nhập kho. Đây là điều kiện tiên quyết để lưu dữ liệu nhập kho.
2. **Tích hợp Cân điện tử (Hardware Integration):**
   * Hệ thống có khả năng kết nối với cân điện tử in tem nhãn qua mạng LAN/Wifi để đồng bộ danh mục hàng hóa xuống cân.
3. **Xử lý Mã vạch thông minh (Barcode Parsing):**
   * Tại quầy thu ngân, hệ thống tích hợp thuật toán tự động nhận diện và bóc tách dữ liệu từ mã vạch do cân in ra (loại mã vạch chứa thông tin khối lượng/giá tiền) để thêm vào giỏ hàng mà không cần nhập thủ công.
4. **Nguyên tắc Xuất kho FIFO (First-In, First-Out):**
   * Hệ thống tự động hóa quy trình trừ tồn kho theo nguyên tắc  **"Nhập trước - Xuất trước"** . Khi bán hàng, hệ thống ưu tiên trừ số lượng của các lô hàng có hạn sử dụng gần nhất hoặc thời gian nhập sớm nhất.
5. **Cảnh báo Hàng cận date (Expiry Alerts):**
   * Cung cấp Dashboard hoặc hệ thống thông báo (Notification) tự động cảnh báo danh sách hàng hóa sắp hết hạn sử dụng để quản lý có phương án xử lý kịp thời.
6. **Quản lý Hủy hàng & Kiểm kê (Waste & Audit):**
   * Hỗ trợ quy trình lập và duyệt "Phiếu hủy hàng" cho sản phẩm hư hỏng/hết hạn.
   * Hệ thống tự động điều chỉnh số lượng tồn kho và ghi nhận lịch sử (Log) chính xác sau khi phiếu hủy hoặc phiếu kiểm kê được duyệt.
