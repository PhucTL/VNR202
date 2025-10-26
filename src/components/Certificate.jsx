import React, { useRef } from 'react';
import { useProgress } from '../context/ProgressContext';

function formatDuration(startTime, endTime) {
  if (!startTime || !endTime) return 'Chưa xác định';
  
  const durationMs = endTime - startTime;
  const minutes = Math.floor(durationMs / (1000 * 60));
  const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
  
  if (minutes > 0) {
    return `${minutes} phút ${seconds} giây`;
  }
  return `${seconds} giây`;
}

function formatDate(timestamp) {
  if (!timestamp) return 'Chưa xác định';
  return new Date(timestamp).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function Certificate({ onClose }) {
  const { playerName, startTimestamp, completionTimestamp } = useProgress();
  const certificateRef = useRef();

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
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">📜 Chứng chỉ hoàn thành</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Certificate Content */}
        <div className="p-6">
          <div 
            ref={certificateRef}
            className="bg-white border-8 border-red-600 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #fef7f0 0%, #ffffff 50%, #fff7ed 100%)',
              borderColor: '#dc2626',
              fontFamily: 'Arial, sans-serif',
              lineHeight: '1.5',
              color: '#1f2937'
            }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-6 left-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🏛️</span>
              </div>
            </div>
            <div className="absolute top-6 right-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🏆</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
            </div>
            <div className="absolute bottom-6 right-6">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
            </div>

            {/* Header decoration */}
            <div className="mb-8 pt-4">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-red-700 mb-2">CHỨNG CHỈ HOÀN THÀNH</h1>
              <div className="w-32 h-2 bg-red-600 mx-auto rounded-full mb-2"></div>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            </div>

            {/* Main content */}
            <div className="mb-8 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🏛️ Hành trình Khám phá Bảo tàng Ảo
              </h2>
              
              <p className="text-xl text-gray-700 mb-6">
                Chứng nhận rằng
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-red-200">
                <h3 className="text-3xl font-bold text-red-600 mb-2">
                  {playerName || 'Người khám phá'}
                </h3>
                <p className="text-lg text-gray-600">
                  đã hoàn thành xuất sắc hành trình khám phá
                </p>
              </div>

              <div className="bg-red-600 text-white rounded-2xl p-6 my-6 shadow-lg">
                <h4 className="text-2xl font-bold mb-2">
                  📚 Dấu ấn Cách mạng (1930-nay)
                </h4>
                <p className="text-lg">
                  Khám phá đầy đủ 5 mốc lịch sử quan trọng của Đảng Cộng sản Việt Nam
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-300">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">⏱️</span>
                    <h5 className="font-bold text-blue-800">Thời gian hoàn thành</h5>
                  </div>
                  <p className="text-blue-700 font-mono text-lg">
                    {formatDuration(startTimestamp, completionTimestamp)}
                  </p>
                </div>

                <div className="bg-green-100 p-4 rounded-xl border-2 border-green-300">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📅</span>
                    <h5 className="font-bold text-green-800">Ngày hoàn thành</h5>
                  </div>
                  <p className="text-green-700 font-mono text-lg">
                    {formatDate(completionTimestamp)}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4">🏅 Thành tích đạt được:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-yellow-200 p-3 rounded-lg border-2 border-yellow-400">
                  <span className="text-2xl block mb-1">🔍</span>
                  <strong>Nhà khám phá</strong><br />
                  Hoàn thành 5/5 mốc lịch sử
                </div>
                <div className="bg-purple-200 p-3 rounded-lg border-2 border-purple-400">
                  <span className="text-2xl block mb-1">📖</span>
                  <strong>Người học hỏi</strong><br />
                  Tìm hiểu lịch sử Đảng
                </div>
                <div className="bg-green-200 p-3 rounded-lg border-2 border-green-400">
                  <span className="text-2xl block mb-1">🎯</span>
                  <strong>Hoàn thành xuất sắc</strong><br />
                  Ghép đủ puzzle lịch sử
                </div>
              </div>
            </div>

            {/* Footer message */}
            <div className="border-t-4 border-red-600 pt-6">
              <p className="text-lg text-gray-700 font-medium mb-4">
                🌟 Chúc mừng bạn đã hoàn thành hành trình khám phá và nhận được chứng chỉ từ Team! 🌟
              </p>
              <p className="text-sm text-gray-500 italic">
                "Lịch sử là ngọn đuốc soi sáng tương lai" - Hồ Chí Minh
              </p>
            </div>

            {/* Signature area */}
            <div className="grid grid-cols-2 gap-8 mt-8 text-sm">
              <div className="text-center">
                <div className="border-t-2 border-gray-400 pt-2 mt-8">
                  <p className="font-bold">Ban Tổ chức</p>
                  <p className="text-gray-600">Bảo tàng Ảo VNR202</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-gray-400 pt-2 mt-8">
                  <p className="font-bold">Ngày cấp</p>
                  <p className="text-gray-600">{formatDate(completionTimestamp)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              📥 Tải chứng chỉ
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              🖨️ In chứng chỉ
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}