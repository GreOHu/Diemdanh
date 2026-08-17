# 🎯 Hệ Thống Điểm Danh QR - Hướng Dẫn Setup

**Tác giả:** GreOHu  
**Ngày:** 2026-08-15  
**Đối tượng:** Đảng ủy phường Trị An

---

## 📋 Trình Tự Setup (Theo Đúng Thứ Tự)

| Bước | Công Việc | Khoảng Thời Gian |
|------|----------|-----------------|
| 1 | Setup Google Sheets | 2 phút |
| 2 | Setup Google Apps Script | 5 phút |
| 3 | Deploy Google Apps Script | 2 phút |
| 4 | Upload Files Lên GitHub | 2 phút |
| 5 | Bật GitHub Pages | 3 phút |
| 6 | Update Deployment ID | 2 phút |
| 7 | Test Hệ Thống | 5 phút |
| **TOTAL** | | **~20 phút** |

---

## 📝 BƯỚC 1: Setup Google Sheets

### **1.1 Tạo Google Sheets Mới**

1. Mở [Google Sheets](https://sheets.google.com)
2. Nhấn **"+ Untitled spreadsheet"**
3. Đặt tên: `Điểm Danh Cuộc Họp`
4. Copy URL (lưu lại, cần dùng ở bước 2)

### **1.2 Không Cần Tùy Chỉnh**

- Để mặc định 1 sheet
- Phần tạo "responses" & "edit_history" sẽ tự động ở bước 2

✅ **Bước 1 xong!**

---

## 🔧 BƯỚC 2: Setup Google Apps Script

### **2.1 Mở Google Apps Script**

1. Quay lại **Google Sheets** (bước 1)
2. Nhấn **"Extensions"** → **"Apps Script"**
3. Xóa tất cả code mặc định (Ctrl+A → Delete)

### **2.2 Paste Code Google Apps Script**

1. Copy file: `google_apps_script.gs` (toàn bộ 220 dòng)
2. Paste vào Google Apps Script editor
3. Nhấn **"Save"** (Ctrl+S)

### **2.3 Chạy setupSheets Lần Đầu**

1. **Dropdown function** (nơi viết "doPost ▼") → Chọn **"setupSheets"**
2. Nhấn **▶️ (Run)**
3. Cho phép truy cập Google Sheets
4. Xem **"Nhật ký thực thi"** (phía dưới) - nên thấy:
   ```
   ✅ Created sheet: responses
   ✅ Created sheet: edit_history
   🎉 Sheets setup complete!
   ```

### **2.4 Kiểm Tra Google Sheets**

- Quay lại **Google Sheets tab**
- Nhìn phía dưới (tabs sheet):
  ```
  ├─ responses ✅
  ├─ edit_history ✅
  ```
- Click **"responses"** → Xem dòng 1 (headers):
  ```
  STT | Họ Tên | Chức Vụ | Đơn Vị | Meeting ID | Thời Gian | Ngày | ...
  ```

✅ **Bước 2 xong!**

---

## 🚀 BƯỚC 3: Deploy Google Apps Script

### **3.1 Nhấn Triển Khai**

Google Apps Script editor → Nút **"Triển Khai"** (phía trên, bên phải)

### **3.2 New Deployment**

- Chọn **"New Deployment"** (hoặc "+ Triển khai mới")
- Type: **"Web app"** (hoặc "Ứng dụng web")

### **3.3 Cấu Hình Deployment**

- **Execute as:** Tài khoản Google của bạn
- **Who has access:** "Anyone" (Bất kỳ ai)
- Nhấn **"Deploy"** (hoặc "Triển khai")

### **3.4 Copy Deployment URL**

Sau khi deploy, cửa sổ hiện ra, bạn sẽ thấy:
```
Deployment ID: xxxxxxxxxx
https://script.google.com/macros/s/AKfycbx-tJF4tAJrp148r1lgC5gwecyC5N12sQqMjlxPrPbu1jspexBnDcS6fd4sy19fgFClsA/usercontent/v1/send
```

**📌 Copy toàn bộ URL đó** (từ `https://` đến `/send`) https://script.google.com/macros/s/AKfycbyMFW2Cot6QRxUVbzglaw3yq5z1JV6WiWQwcfWrk0C-sYbaIesiE8pgDlP81mGR0XMy/exec

**⚠️ LƯU LẠI - CẦN DÙNG Ở BƯỚC 6!**

✅ **Bước 3 xong!**

---

## 📤 BƯỚC 4: Upload Files Lên GitHub

### **4.1 Chuẩn Bị 4 Files**

Bạn sẽ upload:
- `index.html` (Admin panel)
- `checkin.html` (Check-in form - **CHƯA UPDATE ID**)
- `config.json` (Cấu hình)
- `README.md` (File này)

### **4.2 Upload Lên GitHub**

1. GitHub repo: `https://github.com/GreOHu/Diemdanh`
2. Nhấn **"Add file"** → **"Upload files"**
3. Chọn 4 files trên
4. Nhấn **"Commit changes"**

✅ **Bước 4 xong!**

---

## ✅ BƯỚC 5: Bật GitHub Pages

### **5.1 Vào Settings**

1. Repo GitHub → Tab **"Settings"**
2. Scroll xuống → **"Pages"**

### **5.2 Cấu Hình GitHub Pages**

- **Source:** `main` branch
- **Folder:** `/ (root)`
- Nhấn **"Save"**

**Chờ 2-3 phút**, GitHub Pages sẽ active.

**URL GitHub Pages:** 
```
https://greohu.github.io/Diemdanh/
```

✅ **Bước 5 xong!**

---

## 🔧 BƯỚC 6: Update Deployment ID

### **⚠️ QUAN TRỌNG: Làm Bước Này Sau Khi Upload GitHub**

---

### **6.1 Update checkin.html**

1. GitHub repo → File **`checkin.html`**
2. Nhấn **✏️ (Edit this file)**
3. Nhấn Ctrl+F → Tìm: `GOOGLE_APPS_SCRIPT_URL`
4. Tìm dòng (khoảng dòng 314):
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercontent/v1/send';
   ```

5. **Replace toàn bộ URL** bằng URL từ **bước 3.4**
   
   **Từ:**
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercontent/v1/send';
   ```
   
   **Thành:**
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx-tJF4tAJrp148r1lgC5gwecyC5N12sQqMjlxPrPbu1jspexBnDcS6fd4sy19fgFClsA/usercontent/v1/send';
   ```

6. Scroll xuống → **"Commit changes"**

### **6.2 Update config.json**

1. GitHub repo → File **`config.json`**
2. Nhấn **✏️ (Edit this file)**
3. Tìm dòng:
   ```json
   "googleAppsScriptURL": "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercontent/v1/send"
   ```

4. **Replace bằng URL từ bước 3.4**
5. Scroll xuống → **"Commit changes"**

✅ **Bước 6 xong!**

---

## 🧪 BƯỚC 7: Test Hệ Thống

### **7.1 Test Admin Panel**

1. Mở: `https://greohu.github.io/Diemdanh/index.html`
2. **Mật khẩu:** `admin123`
3. Điền thông tin cuộc họp (test):
   - Tên Đơn Vị: `Đảng ủy phường Trị An`
   - Chủ Đề: `Test cuộc họp`
   - Ngày & Giờ
   - Địa Điểm
   - **Tọa Độ:** `10.7769, 106.7622` (Google Maps)
4. Nhấn **"Lưu Cấu Hình & Tạo QR"**
5. Nên thấy **QR code hiển thị** ✅

### **7.2 Test Check-in Form**

1. Mở: `https://greohu.github.io/Diemdanh/checkin.html`
2. **Quét QR** từ admin panel hoặc **nhập Manual Meeting ID**
3. Cho phép GPS (test - có thể từ chối, không ảnh hưởng test)
4. Điền thông tin:
   - Họ Tên: `Nguyễn Văn A`
   - Chức Vụ: `Phó Sở Trưởng`
   - Đơn Vị: `Sở XYZ`
5. Nhấn **"Gửi Thông Tin"**
6. Nên thấy **"✅ Điểm danh thành công!"** ✅

### **7.3 Kiểm Tra Google Sheets**

1. Quay lại **Google Sheets** tab (từ bước 1)
2. Click sheet **"responses"**
3. Nên thấy dữ liệu vừa submit (dòng 2):
   ```
   1 | Nguyễn Văn A | Phó Sở Trưởng | Sở XYZ | HOP-... | 14:30:45 | ...
   ```

**Nếu có dữ liệu → Test THÀNH CÔNG!** ✅✅✅

✅ **Bước 7 xong!**

---

## 💻 BƯỚC 8: Sử Dụng Hệ Thống (Ngày Họp)

### **8.1 Lần Đầu - Admin Cấu Hình**

1. Mở `https://greohu.github.io/Diemdanh/index.html`
2. Đăng nhập (mật khẩu: `admin123`)
3. Điền thông tin cuộc họp:
   - 🏢 Tên Đơn Vị
   - 📋 Chủ Đề
   - 📅 Ngày & ⏰ Giờ
   - 📍 Địa Điểm
   - 🗺️ Tọa Độ (lấy từ Google Maps)
   - 📶 WiFi (tùy chọn)
4. **Lưu Cấu Hình & Tạo QR**
5. **Tải QR (PNG)** → Dùng cho PowerPoint

### **8.2 Tạo PowerPoint (Bạn)**

1. Mở PowerPoint
2. Slide 1: Banner cuộc họp
3. Slide 2: 
   - Paste QR code (PNG từ bước 8.1)
   - Paste hướng dẫn 4 bước (copy từ admin panel)
4. Cấu hình: Auto-loop giữa 2 slide mỗi 30 giây
5. Gửi file PP cho **Người A** (quản lý hội trường)

### **8.3 Ngày Họp - Người A (Quản Lý Hội Trường)**

1. **Double-click PowerPoint**
2. PP tự động loop 2 slide
3. **Xong! Không cần làm gì khác** ✅

### **8.4 Cán Bộ Quét QR**

1. Mở camera điện thoại
2. **Quét QR từ slide PowerPoint**
3. Form hiển thị → Điền: Họ tên, Chức vụ, Đơn vị
4. **Cho phép GPS** (kiểm tra 150m từ hội trường)
5. Nhấn **"Gửi Thông Tin"**
6. **✅ Điểm danh thành công!**

### **8.5 Bạn Monitor (Từ Xa)**

1. **Google Sheets** → Xem danh sách real-time (sheet "responses")
2. **Google Data Studio** (optional) → Xem dashboard
3. **Export Excel** → Báo cáo cho lãnh đạo

---

## 📊 BƯỚC 9: Tạo Google Data Studio Dashboard (Optional)

### **9.1 Tạo Dashboard**

1. Mở [Google Data Studio](https://datastudio.google.com)
2. Nhấn **"Create"** → **"Report"**
3. Đặt tên: `Thống Kê Điểm Danh`

### **9.2 Connect Google Sheets**

1. **"Create new data source"** → **"Google Sheets"**
2. Chọn **Google Sheets** từ bước 1
3. Chọn sheet **"responses"**
4. Nhấn **"Create"**

### **9.3 Thêm Biểu Đồ**

**Biểu Đồ 1: Danh sách (Table)**
- Columns: Họ Tên, Chức Vụ, Đơn Vị, Thời Gian
- Filter: By Meeting ID

**Biểu Đồ 2: Thời gian (Timeline)**
- Dimension: Thời Gian
- Metric: COUNT(Họ Tên)

**Biểu Đồ 3: Tổng số (Scorecard)**
- Metric: COUNT(Họ Tên)

### **9.4 Share Dashboard**

1. Nút **"Share"** (khoá)
2. Role: **"Viewer"**
3. Copy link → Chia sẻ cho lãnh đạo

---

## 🐛 Troubleshooting

### ❌ QR Code Không Load

**Nguyên Nhân:** Cache browser  
**Cách Fix:**
```
Ctrl+Shift+Delete → Clear cache
Refresh: F5
```

### ❌ Check-in Form Không Gửi Dữ Liệu

**Nguyên Nhân:** Deployment URL sai  
**Cách Fix:**
1. Mở F12 → Console
2. Xem lỗi đỏ
3. Kiểm tra URL trong `checkin.html` có đúng không
4. Update lại URL (bước 6)
5. Refresh trang

### ❌ GPS Không Hoạt Động

**Nguyên Nhân:** GPS bị tắt hoặc không cho phép  
**Cách Fix:**
1. Bật GPS trên điện thoại
2. Cho phép ứng dụng truy cập vị trị
3. Chỉ hoạt động qua HTTPS (GitHub Pages đảm bảo)
4. Thử lại

### ❌ Google Sheets Không Nhận Dữ Liệu

**Nguyên Nhân:** Apps Script không deployed đúng  
**Cách Fix:**
1. Kiểm tra Google Apps Script đã deploy chưa
2. Kiểm tra URL trong `checkin.html` có đúng không
3. Chạy `setupSheets()` lại

### ❌ Quên Mật Khẩu Admin

**Mật khẩu mặc định:** `admin123`

**Muốn đổi:** Sửa trong `index.html`
```javascript
const ADMIN_PASSWORD = 'mật_khẩu_mới';
```

---

## ✅ Checklist Hoàn Thành

- [ ] Tạo Google Sheets
- [ ] Setup Google Apps Script
- [ ] Chạy setupSheets() → Sheets tạo xong
- [ ] Deploy Google Apps Script → Copy URL
- [ ] Upload 4 files lên GitHub
- [ ] Bật GitHub Pages
- [ ] Update Deployment ID trong checkin.html
- [ ] Update Deployment ID trong config.json
- [ ] Test Admin Panel → Tạo QR ✅
- [ ] Test Check-in Form → Gửi dữ liệu ✅
- [ ] Kiểm Tra Google Sheets → Dữ liệu có ✅
- [ ] Tạo PowerPoint (2 slides)
- [ ] Ngày họp: Chạy PP → Cán bộ quét → Điểm danh ✅

---

## 📱 Sử Dụng Trên Mobile

- ✅ **Check-in form:** Responsive 100% (mobile-friendly)
- ✅ **Admin panel:** Có thể dùng trên mobile nhưng khó hơn
- ✅ **Google Sheets:** Xem được trên mobile

---

## 🔐 Bảo Mật

- ✅ GPS validation: 150m từ hội trường
- ✅ Không quét 2 lần: Lần 2 cho edit, không tạo dòng mới
- ✅ Lịch sử edit: Được ghi nhận (sheet "edit_history")
- ✅ Admin password: Mặc định `admin123` (có thể đổi)

---

## 💾 Backup & Export

**Export dữ liệu:**
1. Google Sheets → Download as Excel/CSV
2. Làm hàng ngày sau cuộc họp
3. Lưu local + Cloud

---

## 📞 Support

**Cần giúp?**
- Kiểm tra Troubleshooting trên
- Xem console browser (F12 → Console)
- Kiểm tra Google Sheets có dữ liệu không
- Kiểm tra Apps Script Logs

---

**Mọi thứ đã sẵn sàng! Chúc bạn thành công! 🚀**
