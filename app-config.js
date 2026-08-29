// ============================================================
// APP CONFIG — cấu hình DÙNG CHUNG cho toàn bộ hệ thống Điểm Danh
// ============================================================
// File này được nhúng vào MỌI trang HTML (index.html, checkin.html,
// và các trang sau này) bằng thẻ:
//   <script src="app-config.js"></script>
// đặt TRƯỚC thẻ <script> chứa logic của từng trang.
//
// Khi cần đổi các giá trị chung (bán kính GPS, mật khẩu admin mặc định...),
// CHỈ sửa ở file DUY NHẤT này rồi upload lại lên GitHub — không cần sửa
// từng file .html. Mọi trang tự động dùng giá trị mới ngay lần tải sau.
// ============================================================

const APP_CONFIG = {
    // Bán kính GPS cho phép (mét) — người điểm danh phải đứng trong phạm vi
    // này tính từ toạ độ hội trường (coordinates) mới được điểm danh.
    // Áp dụng CHUNG cho mọi cuộc họp.
    gpsRadius: 30,

    // Mật khẩu admin mặc định dùng khi tạo cuộc họp mới ở trang index.html,
    // và cũng là mật khẩu để mở chức năng "Điểm danh thay" ở checkin.html.
    // Lưu ý: đây KHÔNG phải cơ chế bảo mật mạnh (chỉ so sánh chuỗi ở phía
    // trình duyệt), tương đương mức bảo mật hiện có của toàn hệ thống.
    adminPassword: 'admin123'
};
