# TÀI LIỆU PHÂN TÍCH THIẾT KẾ HỆ THỐNG

## 1.2.3. Hoạt động Quản lý Kho Hàng (Nhập – Xuất – Tồn – Hủy)

### • Quản lý Nhập hàng

* Khi hàng trong kho gần hết, **chủ quán hoặc người bán** sẽ liên hệ trực tiếp với **nhà cung cấp** để nhập thêm hàng.
* Khi hàng được giao đến quán:
  * Kiểm tra **số lượng** và  **tình trạng hàng hóa** .
  * Đối với các mặt hàng có **Hạn sử dụng (HSD)** như: sữa, nước giải khát, mì gói, bánh kẹo…, hệ thống cho phép nhập:
    * Mã lô (có thể tự sinh hoặc nhập tay)
    * Ngày sản xuất (nếu có)
    * Hạn sử dụng (HSD)
    * Số lượng nhập
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
  * Ghi rõ:
    * Mã hàng
    * Số lượng
    * Lý do hủy (Hết hạn, Hỏng, Dập nát…)
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
