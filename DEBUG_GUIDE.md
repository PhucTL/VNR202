# 🔧 Hướng dẫn Debug: Lỗi "Cannot update component while rendering"

## ❌ LỖI ĐÃ SỬA

### Vấn đề:
```
Cannot update a component (ProgressProvider) while rendering a different component (PuzzleUnlock)
```

### Nguyên nhân:
- Trong `PuzzleUnlock.jsx`, đang gọi `markPhaseComplete()` trong quá trình render
- React không cho phép update state của component khác trong lúc render

### ✅ CÁCH SỬA:

#### 1. Đã thêm useEffect vào PuzzleUnlock:
```jsx
// TRƯỚC (Sai):
const unlockedPhases = TIMELINE.filter(phase => {
  const allMilestonesUnlocked = phase.milestones.every(milestone => unlockedPieces.includes(milestone.id));
  
  // ❌ Gọi setState trong render
  if (allMilestonesUnlocked) {
    markPhaseComplete(phase.id || phase.yearRange);
  }
  
  return allMilestonesUnlocked;
});

// SAU (Đúng):
const unlockedPhases = TIMELINE.filter(phase => {
  const allMilestonesUnlocked = phase.milestones.every(milestone => unlockedPieces.includes(milestone.id));
  return allMilestonesUnlocked; // ✅ Chỉ return, không setState
});

// ✅ Dùng useEffect để setState
useEffect(() => {
  unlockedPhases.forEach(phase => {
    markPhaseComplete(phase.id || phase.yearRange);
  });
}, [unlockedPhases.length, markPhaseComplete]);
```

## 🔍 DEBUG TÍNH NĂNG TÊN & THỜI GIAN

### Để debug tại sao không hiện tên và thời gian:

#### 1. Mở Developer Console (F12)
Xem các log debug:
- `📊 Loading from localStorage:` - Kiểm tra playerName, startTimestamp
- `🔍 Completion check:` - Kiểm tra logic completion
- `🎓 Certificate data:` - Kiểm tra data trong Certificate

#### 2. Sử dụng Debug Controls
Trong development mode có các nút:
- **Set Test Data**: Tạo playerName và startTimestamp giả
- **Unlock All**: Mở khóa tất cả để test completion
- **Log State**: Xem toàn bộ state hiện tại
- **Reset Progress**: Xóa tất cả và bắt đầu lại

#### 3. Kiểm tra localStorage
Trong Console:
```javascript
// Kiểm tra dữ liệu
console.log('playerName:', localStorage.getItem('playerName'));
console.log('startTimestamp:', localStorage.getItem('startTimestamp'));
console.log('progress:', localStorage.getItem('museum_progress_v2'));

// Set dữ liệu test
localStorage.setItem('playerName', 'Test User');
localStorage.setItem('startTimestamp', Date.now().toString());
```

## 🎯 CÁC TRƯỜNG HỢP THƯỜNG GẶP

### Case 1: Không có tên người dùng
**Nguyên nhân**: Chưa điền form ở trang Home
**Giải pháp**: 
1. Về trang Home
2. Click "Khám phá ngay"
3. Điền tên và submit

### Case 2: Không có thời gian hoàn thành
**Nguyên nhân**: Chưa hoàn thành đủ 5/5 giai đoạn
**Giải pháp**:
1. Kiểm tra progress (phải 5/5)
2. Dùng "Unlock All" button để test
3. Kiểm tra `completedPhases.length === TIMELINE.length`

### Case 3: Có tên nhưng hiện "Đang tính toán..."
**Nguyên nhân**: `startTimestamp` hoặc `completionTimestamp` bị null
**Debug**:
```javascript
// Trong console
const progress = JSON.parse(localStorage.getItem('museum_progress_v2'));
console.log('Completion timestamp:', progress.completionTimestamp);
```

## 🔄 WORKFLOW DEBUG

### Bước 1: Kiểm tra localStorage
```javascript
localStorage.getItem('playerName') // Phải có tên
localStorage.getItem('startTimestamp') // Phải có timestamp
```

### Bước 2: Kiểm tra completion
```javascript
const progress = JSON.parse(localStorage.getItem('museum_progress_v2'));
console.log('Completed phases:', progress.completedPhases?.length);
console.log('Total phases:', 5); // Phải bằng nhau
```

### Bước 3: Test manual completion
```javascript
// Force completion
const timestamp = Date.now();
const progress = JSON.parse(localStorage.getItem('museum_progress_v2') || '{}');
progress.completionTimestamp = timestamp;
localStorage.setItem('museum_progress_v2', JSON.stringify(progress));
window.location.reload();
```

## ✅ CHECKLIST HOẠT ĐỘNG

- [ ] playerName trong localStorage
- [ ] startTimestamp trong localStorage  
- [ ] completedPhases.length === 5
- [ ] completionTimestamp được set
- [ ] Certificate component nhận đúng props
- [ ] Format functions hoạt động

## 🎯 SỬA LỖI NHANH

Nếu vẫn lỗi, chạy script này trong Console:
```javascript
// Reset và set dữ liệu test
localStorage.clear();
localStorage.setItem('playerName', 'Người dùng Test');
localStorage.setItem('startTimestamp', (Date.now() - 60000).toString());

// Fake completion
const progress = {
  unlockedPieces: ['all'],
  completedPhases: ['1930-1945', '1945-1954', '1954-1975', '1975-2000', '2000-now'],
  completionTimestamp: Date.now()
};
localStorage.setItem('museum_progress_v2', JSON.stringify(progress));

// Reload
window.location.reload();
```

Sau đó thử mở Certificate để xem dữ liệu!