import React, { useRef, memo } from 'react';
import { useProgress } from '../context/ProgressContext';

function formatDuration(startTime, endTime) {
  if (!startTime || !endTime) return 'Đang tính toán...';
  
  const durationMs = endTime - startTime;
  const minutes = Math.floor(durationMs / (1000 * 60));
  const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
  
  if (minutes > 0) {
    return `${minutes} phút ${seconds} giây`;
  }
  return `${seconds} giây`;
}

function formatDate(timestamp) {
  if (!timestamp) return 'Đang cập nhật...';
  try {
    return new Date(timestamp).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Không xác định';
  }
}

const Certificate = memo(function Certificate({ onClose }) {
  const { playerName, startTimestamp, completionTimestamp, refreshPlayerData } = useProgress();
  const certificateRef = useRef();

  // Debug log
  console.log('🎓 Certificate data:', { 
    playerName, 
    startTimestamp, 
    completionTimestamp,
    startDate: startTimestamp ? new Date(startTimestamp) : null,
    completionDate: completionTimestamp ? new Date(completionTimestamp) : null
  });

  const handleRefresh = () => {
    console.log('🔄 Refreshing certificate data...');
    refreshPlayerData();
  };

  const handleDownload = () => {
    // Sử dụng html2canvas để tạo ảnh từ certificate
    import('html2canvas').then(html2canvas => {
      if (certificateRef.current) {
        // Tạo style tạm thời để tối ưu render
        const originalStyle = certificateRef.current.style.cssText;
        
        html2canvas.default(certificateRef.current, {
          backgroundColor: '#ffffff',
          scale: 3, // Tăng scale để có chất lượng cao hơn
          logging: false,
          useCORS: true,
          allowTaint: false,
          foreignObjectRendering: false,
          imageTimeout: 0,
          height: certificateRef.current.scrollHeight,
          width: certificateRef.current.scrollWidth,
          // Tối ưu cho border và background
          ignoreElements: (element) => {
            return element.classList && element.classList.contains('no-capture');
          }
        }).then(canvas => {
          // Khôi phục style gốc
          certificateRef.current.style.cssText = originalStyle;
          
          const link = document.createElement('a');
          link.download = `chung-chi-bao-tang-ao-${playerName?.replace(/\s+/g, '-') || 'nguoi-choi'}-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
          
          // Hiển thị thông báo thành công
          alert('✅ Chứng chỉ đã được tải xuống thành công!');
        }).catch(error => {
          console.error('Error generating certificate:', error);
          alert('❌ Không thể tạo chứng chỉ. Vui lòng thử lại hoặc sử dụng chức năng In.');
        });
      }
    }).catch(() => {
      // Fallback: in trang
      alert('Không thể tải xuống. Vui lòng sử dụng chức năng In chứng chỉ.');
      window.print();
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-[600px]">
        {/* Header */}
        <div className="border-b border-gray-200 flex justify-between items-center p-4">
          <h2 className="text-lg font-bold text-gray-800">📜 Chứng chỉ hoàn thành</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Certificate Content */}
        <div className="p-4 h-[580px] overflow-hidden">
          <div 
            ref={certificateRef}
            className="bg-white border-4 border-red-600 rounded-2xl p-6 text-center relative overflow-hidden shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #fef7f0 0%, #ffffff 50%, #fff7ed 100%)',
              borderColor: '#dc2626',
              fontFamily: 'Arial, sans-serif',
              lineHeight: '1.2',
              color: '#1f2937',
              height: '500px'
            }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏛️</span>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏆</span>
              </div>
            </div>
            <div className="absolute bottom-2 left-2">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⭐</span>
              </div>
            </div>
            <div className="absolute bottom-2 right-2">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🎯</span>
              </div>
            </div>

            {/* Header decoration */}
            <div>
              <div className="text-xl mb-1">🎉</div>
              <h4 className="text-xl font-bold text-red-700">CHỨNG CHỈ HOÀN THÀNH</h4>
              <div className="w-20 h-0.5 bg-red-600 mx-auto rounded-full mb-0.5"></div>
              <div className="w-12 h-0.5 bg-yellow-500 mx-auto rounded-full"></div>
            </div>

            {/* Main content */}
            <div className="space-y-2">
              <h2 className="text-base font-bold text-gray-800 mb-1">
                🏛️ Hành trình Khám phá Bảo tàng Ảo
              </h2>
              
              <p className="text-sm text-gray-700">
                Chứng nhận rằng
              </p>

              <div className="bg-white rounded-lg shadow border border-red-200">
                <h3 className="text-lg font-bold text-red-600">
                  {playerName || 'Người khám phá ẩn danh'}
                </h3>
                <p className="text-xs text-gray-600">
                  đã hoàn thành xuất sắc hành trình khám phá
                </p>
              </div>

              <div className="bg-red-600 text-white rounded-lg p-1.5 shadow">
                <h4 className="text-sm font-bold">
                  📚 Dấu ấn Cách mạng (1930-nay)
                </h4>
                <p className="text-[10px]">
                  Khám phá đầy đủ 5 mốc lịch sử quan trọng của Đảng Cộng sản Việt Nam
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-left">
                <div className="bg-blue-50 p-1.5 rounded border border-blue-200">
                  <div className="flex items-center">
                    <span className="text-sm mr-1">⏱️</span>
                    <h5 className="text-xs font-bold text-blue-800">Thời gian hoàn thành</h5>
                  </div>
                  <p className="text-blue-700 font-mono text-[10px]">
                    {formatDuration(startTimestamp, completionTimestamp)}
                  </p>
                </div>

                <div className="bg-green-50 p-1.5 rounded border border-green-200">
                  <div className="flex items-center">
                    <span className="text-sm mr-1">📅</span>
                    <h5 className="text-xs font-bold text-green-800">Ngày hoàn thành</h5>
                  </div>
                  <p className="text-green-700 font-mono text-[10px]">
                    {formatDate(completionTimestamp)}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-2">
              <h4 className="text-sm font-bold text-gray-800 mb-1">🏅 Thành tích:</h4>
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <div className="bg-yellow-50 p-1.5 rounded border border-yellow-200">
                  <span className="text-sm block">🔍</span>
                  <strong>Nhà khám phá</strong>
                  <div className="text-[9px]">5/5 mốc lịch sử</div>
                </div>
                <div className="bg-purple-50 p-1.5 rounded border border-purple-200">
                  <span className="text-sm block">📖</span>
                  <strong>Người học hỏi</strong>
                  <div className="text-[9px]">Lịch sử Đảng</div>
                </div>
                <div className="bg-green-50 p-1.5 rounded border border-green-200">
                  <span className="text-sm block">🎯</span>
                  <strong>Xuất sắc</strong>
                  <div className="text-[9px]">Hoàn thành puzzle</div>
                </div>
              </div>
            </div>

            {/* Footer message */}
            <div className="border-t border-red-600 pt-1.5">
              <p className="text-xs text-gray-700">
                🌟 Chúc mừng bạn đã hoàn thành hành trình! 🌟
              </p>
            </div>

            {/* Signature area */}
            <div className="grid grid-cols-2 gap-1 mt-1.5 text-[9px]">
              <div className="text-center">
                <div className="border-t border-gray-200 pt-0.5">
                  <p className="font-bold">Ban Tổ chức</p>
                  <p className="text-gray-600">Bảo tàng Ảo VNR202</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-200 pt-0.5">
                  <p className="text-gray-600">{formatDate(completionTimestamp)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-2 mt-3 border-t border-gray-200 pt-3">
            <button
              onClick={handleRefresh}
              className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition flex items-center gap-1 text-xs"
            >
              🔄 Cập nhật
            </button>
            <button
              onClick={handleDownload}
              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-1 text-xs"
            >
              📥 Tải xuống
            </button>
            <button
              onClick={handlePrint}
              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-1 text-xs"
            >
              🖨️ In
            </button>
            <button
              onClick={onClose}
              className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-xs"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Certificate;