# Hướng dẫn sử dụng hệ thống Chứng chỉ và Panorama

## 🎯 Tính năng mới đã thêm

### 1. Form nhập tên người chơi (Trang Home)
- **Mô tả**: Người dùng nhập tên trước khi bắt đầu khám phá
- **Chức năng**: 
  - Lưu `playerName` vào localStorage
  - Lưu `startTimestamp` (thời gian bắt đầu)
  - Hiển thị thông báo động viên
  - Chuyển hướng đến trang khám phá

### 2. Hệ thống theo dõi tiến độ (ProgressContext)
- **Dữ liệu được lưu**:
  - `playerName`: Tên người chơi
  - `startTimestamp`: Thời gian bắt đầu
  - `completionTimestamp`: Thời gian hoàn thành (tự động lưu khi hoàn thành 5/5 mốc)
  - `unlockedPieces`: Danh sách các mốc đã mở khóa
  - `completedPhases`: Danh sách các giai đoạn đã hoàn thành

### 3. Chứng chỉ hoàn thành (Certificate Component)
- **Thiết kế**: Chứng chỉ đẹp mắt với gradient màu đỏ-vàng
- **Thông tin hiển thị**:
  - Tên người chơi
  - Thời gian hoàn thành (phút:giây)
  - Ngày hoàn thành
  - Thành tích đạt được
  - Chữ ký số và logo
- **Chức năng**:
  - 📥 Tải chứng chỉ dạng PNG (sử dụng html2canvas)
  - 🖨️ In chứng chỉ
  - Responsive design

### 4. Panorama lịch sử (Panorama Component)
- **Hiển thị**: Tất cả hình ảnh từ 5 giai đoạn lịch sử
- **Tính năng**:
  - Grid layout responsive
  - Modal xem ảnh phóng to
  - Thông tin chi tiết cho từng ảnh
  - Phân loại theo giai đoạn lịch sử
  - Hover effects và animations

### 5. Modal hiển thị khi hoàn thành (PuzzleUnlock)
- **Điều kiện kích hoạt**: Hoàn thành đủ 5/5 giai đoạn lịch sử
- **Nội dung**:
  - Thông báo chúc mừng
  - Nút "🖼️ Xem Panorama"
  - Nút "📜 Chứng nhận hoàn thành"

## 🚀 Cách sử dụng

### Bước 1: Bắt đầu hành trình
1. Vào trang Home
2. Click "🚀 Khám phá ngay"
3. Nhập tên của bạn
4. Click "🎯 Bắt đầu khám phá"

### Bước 2: Khám phá 5 mốc lịch sử
1. Hoàn thành quiz cho từng mốc
2. Mở khóa từng mảnh ghép
3. Theo dõi tiến độ trên puzzle board

### Bước 3: Nhận chứng chỉ
1. Khi hoàn thành 5/5 mốc → Hiện modal chúc mừng
2. Click "📜 Chứng nhận hoàn thành"
3. Tải xuống hoặc in chứng chỉ

### Bước 4: Xem Panorama
1. Click "🖼️ Xem Panorama"
2. Duyệt qua tất cả hình ảnh lịch sử
3. Click vào ảnh để xem chi tiết

## 🛠️ Cài đặt và Dependencies

### Thư viện đã thêm
```bash
npm install html2canvas
```

### Files đã tạo/chỉnh sửa
- ✅ `src/pages/Home.jsx` - Thêm form nhập tên
- ✅ `src/context/ProgressContext.jsx` - Thêm tracking completion
- ✅ `src/components/Certificate.jsx` - **MỚI** - Chứng chỉ đẹp
- ✅ `src/components/Panorama.jsx` - **MỚI** - Gallery panorama
- ✅ `src/components/PuzzleUnlock.jsx` - Thêm modal

## 📱 Responsive Design

- **Desktop**: Layout 3-4 cột cho gallery
- **Tablet**: Layout 2-3 cột 
- **Mobile**: Layout 1-2 cột, UI tối ưu touch

## 🎨 Thiết kế

### Màu sắc chủ đạo
- **Đỏ**: #dc2626, #ef4444 (Đảng, lịch sử)
- **Vàng**: #eab308, #f59e0b (Vinh quang, thành tựu)
- **Xanh**: #059669, #10b981 (Hoàn thành, thành công)

### Typography
- **Tiêu đề**: Font-bold, sizes 2xl-4xl
- **Nội dung**: Font-medium, size base-lg
- **Metadata**: Font-mono, size sm-xs

## 🔧 Debug và Test

### localStorage Keys
```javascript
// Kiểm tra dữ liệu trong localStorage
localStorage.getItem('playerName')        // Tên người chơi  
localStorage.getItem('startTimestamp')    // Thời gian bắt đầu
localStorage.getItem('museum_progress_v2') // Tiến độ + completion
```

### Reset Progress (Dev mode)
```javascript
// Xóa toàn bộ progress
localStorage.removeItem('museum_progress_v2');
localStorage.removeItem('playerName');
localStorage.removeItem('startTimestamp');
window.location.reload();
```

## 🚨 Lưu ý quan trọng

1. **Chức năng tải xuống**: Yêu cầu trình duyệt hỗ trợ Canvas API
2. **CORS**: Một số ảnh có thể cần cấu hình CORS để tải xuống
3. **Performance**: html2canvas có thể chậm với ảnh lớn
4. **Browser support**: Tính năng hoạt động tốt trên Chrome, Firefox, Safari hiện đại

## 📸 Screenshots

### Chứng chỉ mẫu
- Thiết kế gradient đỏ-vàng sang trọng
- Logo và border trang trí
- Thông tin đầy đủ về thành tích
- Chữ ký số và timestamp

### Panorama Gallery
- Grid responsive hiển thị tất cả ảnh
- Hover effects mượt mà
- Modal xem chi tiết
- Phân loại theo giai đoạn

## 🎉 Kết luận

Hệ thống đã được nâng cấp thành công với:
- ✅ User experience cá nhân hóa
- ✅ Chứng chỉ hoàn thành đẹp mắt  
- ✅ Gallery panorama đầy đủ
- ✅ Tracking tiến độ chi tiết
- ✅ Download/Print functionality
- ✅ Responsive design hoàn chỉnh

**Sẵn sàng để triển khai và sử dụng!** 🚀