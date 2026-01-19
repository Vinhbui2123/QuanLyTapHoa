# Mô tả luồng hoạt động: Thanh toán hóa đơn

## a. Luồng sự kiện chính (Thanh toán thành công)

1. **Kích hoạt:** Nhân viên Thu ngân (NVTN) bắt đầu một phiên thanh toán mới bằng cách nhấn vào nút "Tạo hóa đơn mới" trên giao diện POS.

2. **Hệ thống phản hồi:** Hệ thống tạo một đối tượng Hóa đơn mới ở trạng thái "Đang xử lý".

3. **Quét sản phẩm:** NVTN lần lượt dùng máy quét để quét mã vạch trên từng sản phẩm của khách hàng.

4. **Xử lý và phân loại mã vạch:** Với mỗi mã vạch được quét, hệ thống tự động phân tích và xử lý:
   - Nếu là mã vạch từ nhà cung cấp (hàng khô), hệ thống sẽ truy vấn CSDL để lấy tên và đơn giá, sau đó thêm một dòng chi tiết vào hóa đơn.
   - Nếu là mã vạch từ quầy cân (hàng tươi sống), hệ thống sẽ giải mã để lấy thông tin tên hàng và thành tiền đã được mã hóa sẵn, sau đó thêm một dòng chi tiết vào hóa đơn.

5. **Cập nhật liên tục:** Sau mỗi lần quét, hệ thống tự động tính lại tổng tiền của hóa đơn và cập nhật hiển thị chi tiết trên màn hình cho NVTN và khách hàng theo dõi.

6. **Xử lý thanh toán:** Sau khi quét hết sản phẩm, NVTN nhập số tiền khách đưa. Hệ thống sẽ tính toán và hiển thị số tiền thừa cần trả lại.

7. **Hoàn tất giao dịch:** NVTN nhấn nút "Hoàn tất". Hệ thống thực hiện đồng thời các tác vụ cuối cùng:
   - Cập nhật trạng thái hóa đơn thành "Hoàn tất" và lưu vào CSDL.
   - Gửi lệnh in hóa đơn chi tiết ra máy in.
   - Gửi yêu cầu đến hệ thống Kho hàng để tự động trừ số lượng tồn kho của các mặt hàng đã bán theo nguyên tắc FIFO (hàng nhập trước, xuất trước).

8. **Kết thúc:** NVTN trao hóa đơn và tiền thừa (nếu có) cho khách hàng.

---

## b. Các luồng rẽ nhánh

### Ngoại lệ: Mã vạch không hợp lệ

**Tại bước 4:** Nếu mã vạch quét vào không tồn tại trong hệ thống hoặc không thể giải mã, hệ thống sẽ:
- Phát ra âm báo lỗi
- Hiển thị thông báo "Mã vạch không hợp lệ" trên màn hình

**Xử lý:** NVTN có các lựa chọn sau:
- **Quét lại:** Thử quét lại mã vạch (quay lại bước 3)
- **Nhập thủ công:** Nhập mã vạch bằng bàn phím
- **Tìm kiếm theo tên:** Tìm sản phẩm bằng cách nhập tên hoặc từ khóa, sau đó chọn sản phẩm từ danh sách kết quả
- **Bỏ qua:** Không thêm sản phẩm này vào hóa đơn

Sau khi xử lý xong, tiếp tục bước 5 (Cập nhật liên tục).

---

### Ngoại lệ: Khách hàng hủy hóa đơn

**Thời điểm xảy ra:** Tại bất kỳ thời điểm nào trước khi NVTN nhấn "Hoàn tất" (bước 7).

**Điều kiện:** Khách hàng đổi ý không mua nữa hoặc NVTN cần hủy giao dịch vì lý do khác.

**Quy trình:**
1. NVTN chọn chức năng "Hủy hóa đơn" trên giao diện POS.
2. Hệ thống hiển thị popup xác nhận: "Bạn có chắc muốn hủy giao dịch?"
3. NVTN xác nhận hủy.
4. Hệ thống thực hiện:
   - Hủy bỏ hoàn toàn đối tượng Hóa đơn đang xử lý (không lưu vào CSDL)
   - **Không** cập nhật kho hàng (vì chưa có giao dịch thành công)
   - Quay trở về màn hình bắt đầu, sẵn sàng cho giao dịch tiếp theo
5. Hệ thống thông báo "Đã hủy giao dịch thành công"
