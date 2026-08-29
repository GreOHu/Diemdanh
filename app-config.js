// ============================================================
// APP CONFIG — cấu hình DÙNG CHUNG cho toàn bộ hệ thống Điểm Danh
// ============================================================
// File này được nhúng vào MỌI trang HTML (index.html, checkin.html,
// và các trang sau này) bằng thẻ:
//   <script src="app-config.js"></script>
// đặt TRƯỚC thẻ <script> chứa logic của từng trang.
//
// Khi cần đổi các giá trị chung (bán kính GPS, mật khẩu admin mặc định,
// URL Google Apps Script...), CHỈ sửa ở file DUY NHẤT này rồi upload lại
// lên GitHub — không cần sửa từng file .html. Mọi trang tự động dùng giá
// trị mới ngay lần tải sau.
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
    adminPassword: 'admin123',
    // URL deploy của Google Apps Script Web App (kết thúc bằng /exec).
    // Mỗi lần tạo bản deploy MỚI trên script.google.com (Deploy > New
    // deployment), Google sinh ra một URL /exec khác — chỉ cần dán URL
    // mới vào ĐÚNG MỘT chỗ này, không phải sửa index.html lẫn checkin.html
    // nữa. Nhớ để "Who has access" = "Anyone" khi deploy.
    googleAppsScriptURL: 'https://script.google.com/macros/s/AKfycbzrieBFXUOXxC6Kfq-o1nBbO37aSdsYPz_yZ9BRBDD6-Etj7JtyUUy-5Dl7n-ZVPn2z9w/exec'
};
