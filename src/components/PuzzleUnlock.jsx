import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import TIMELINE from '../data/timeline';
import Certificate from './Certificate';
import Panorama from './Panorama';

const PuzzleUnlock = () => {
  const { unlockedPieces, unlockPiece, isCompleted, markPhaseComplete } = useProgress();
  const [showCertificate, setShowCertificate] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);
  
  // Debug: Log để kiểm tra dữ liệu
  console.log('Unlocked pieces:', unlockedPieces);
  console.log('Timeline:', TIMELINE);
  
  // Tính toán các mảnh ghép đã mở khóa
  const totalPhases = TIMELINE.length;
  const unlockedPhases = TIMELINE.filter(phase => {
    const allMilestonesUnlocked = phase.milestones.every(milestone => unlockedPieces.includes(milestone.id));
    console.log(`Phase ${phase.yearRange}:`, phase.milestones.map(m => m.id), 'Unlocked:', allMilestonesUnlocked);
    return allMilestonesUnlocked;
  });

  // Use useEffect to mark phases as complete
  useEffect(() => {
    unlockedPhases.forEach(phase => {
      markPhaseComplete(phase.id || phase.yearRange);
    });
  }, [unlockedPhases.length, markPhaseComplete]);
  
  const progress = (unlockedPhases.length / totalPhases) * 100;
  const isCompletedLocal = unlockedPhases.length === totalPhases;

  const puzzlePieces = [
    {
      id: 'piece-1930',
      period: '1930–1945',
      title: 'Khởi đầu cách mạng',
      position: 'left-0',
      clipPath: 'polygon(0% 0%, 20% 0%, 18% 100%, 0% 100%)',
      bgGradient: 'from-red-900 via-red-700 to-red-600',
      bgImage: '/assets/daihoiIV_1.jpg',
      content: '🚩 Thành lập Đảng\n📅 3/2/1930\n🎯 Cách mạng dân tộc'
    },
    {
      id: 'piece-1945',
      period: '1945–1954', 
      title: 'Kháng chiến chống Pháp',
      position: 'left-[20%]',
      clipPath: 'polygon(0% 0%, 20% 0%, 22% 100%, 0% 100%)',
      bgGradient: 'from-orange-800 via-orange-600 to-red-600',
      bgImage: '/assets/daihoiIV_2.jpg',
      content: '⚔️ Kháng chiến toàn dân\n🏔️ Điện Biên Phủ\n🎯 Độc lập dân tộc'
    },
    {
      id: 'piece-1954',
      period: '1954–1975',
      title: 'Kháng chiến chống Mỹ', 
      position: 'left-[40%]',
      clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 0% 100%)',
      bgGradient: 'from-yellow-700 via-yellow-600 to-orange-500',
      bgImage: '/assets/bachohominh.jpg',
      content: '🌟 Chiến thắng 30/4\n🏛️ Thống nhất đất nước\n🎯 Giải phóng dân tộc'
    },
    {
      id: 'piece-1975',
      period: '1975–2000',
      title: 'Đổi mới và phát triển',
      position: 'left-[60%]', 
      clipPath: 'polygon(0% 0%, 20% 0%, 22% 100%, 0% 100%)',
      bgGradient: 'from-green-700 via-green-600 to-yellow-500',
      bgImage: '/assets/leduan.jpeg',
      content: '🔄 Đổi mới kinh tế\n📈 Mở cửa hội nhập\n🎯 Phát triển đất nước'
    },
    {
      id: 'piece-2000',
      period: '2000–nay',
      title: 'Hội nhập và phát triển',
      position: 'left-[80%]',
      clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 0% 100%)', 
      bgGradient: 'from-blue-700 via-blue-600 to-green-500',
      bgImage: '/assets/PSD-Ho-Chi-Minh-VietNam2.jpg',
      content: '🌏 Hội nhập quốc tế\n🏢 Hiện đại hóa\n🎯 Thịnh vượng dân tộc'
    }
  ];

  const getPhaseCompletion = (period) => {
    const phase = TIMELINE.find(p => p.yearRange === period);
    if (!phase) return { completed: 0, total: 0, isUnlocked: false };
    
    // Đếm số milestone đã unlock trong phase này
    const completed = phase.milestones.filter(m => unlockedPieces.includes(m.id)).length;
    const total = phase.milestones.length;
    const isUnlocked = completed === total && total > 0; // Cả phase unlock khi tất cả milestone completed
    
    console.log(`Phase ${period}: ${completed}/${total} completed, unlocked: ${isUnlocked}`);
    
    return { completed, total, isUnlocked };
  };

  return (
    
    <div className="mt-8">
      <div className="mb-8 p-6 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl border border-red-200 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-3">
          🧩 Bức tranh lịch sử Việt Nam
        </h2>
        <p className="text-base text-slate-600">
          Hoàn thành <strong>cả 3 cột mốc</strong> trong mỗi giai đoạn để khôi phục mảnh ghép tương ứng. Mục tiêu: <strong>5 mảnh ghép toàn cảnh 1930-nay!</strong>
        </p>
      </div>

      {/* Bức tranh puzzle chính */}
      <div className="relative w-full h-96 mx-auto bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-400 mb-8">
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 opacity-50"></div>
        
        {/* Puzzle pieces */}
        {puzzlePieces.map((piece, index) => {
          const { completed, total, isUnlocked } = getPhaseCompletion(piece.period);
          
          // Debug log bên trong render
          if (index === 0) { // Chỉ log một lần
            console.log('🖼️ Debug: Current unlockedPieces in render:', unlockedPieces);
            console.log('🖼️ All pieces unlock status:');
            puzzlePieces.forEach(p => {
              const result = getPhaseCompletion(p.period);
              console.log(`  ${p.period}: unlocked=${result.isUnlocked}, image=${p.bgImage}`);
            });
          }
          
          return (
            <div
              key={piece.id}
              className={`absolute w-1/5 h-full transition-all duration-700 hover:scale-105 hover:z-10 ${piece.position}`}
             
            >
              {/* Piece background */}
              <div className={`w-full h-full relative transition-all duration-500 ${isUnlocked ? 'opacity-100' : 'opacity-30'}`}>
                
                {/* Background image khi unlock */}
                {isUnlocked && piece.bgImage && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={piece.bgImage}
                      alt={piece.title}
                      className="w-full h-full object-cover transition-all duration-700"
                      onLoad={() => console.log('✅ Image loaded:', piece.bgImage)}
                      onError={(e) => {
                        console.log('❌ Image failed to load:', piece.bgImage);
                        console.log('Error details:', e);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                )}
                
                {/* Gradient background khi chưa unlock hoặc fallback */}
                <div className={`absolute inset-0 bg-gradient-to-br ${piece.bgGradient} ${isUnlocked && piece.bgImage ? 'opacity-20' : 'opacity-100'} transition-all duration-500 z-10`}></div>
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 z-20"></div>
                
                {/* Lock/Unlock status */}
                <div className="absolute top-6 left-6 z-40">
                  {isUnlocked ? (
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-bounce">
                      <span className="text-white text-xl font-bold">✓</span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center shadow-xl border-4 border-gray-500">
                      <span className="text-white text-xl">🔒</span>
                    </div>
                  )}
                </div>

                {/* UNLOCKED label */}
                {isUnlocked && (
                  <div className="absolute top-20 left-6 z-40">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg border-2 border-white">
                      ĐÃ MỞ KHÓA
                    </div>
                  </div>
                )}

                {/* Period info */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-30">
                  <div className="text-lg font-bold mb-2 drop-shadow-lg">{piece.period}</div>
                  <div className="text-sm opacity-90 mb-3 line-clamp-2 drop-shadow">{piece.title}</div>
                  
                  {/* Hiển thị nội dung chi tiết khi unlock */}
                  {isUnlocked && piece.content && (
                    <div className="mb-3 p-2 bg-black/60 rounded-lg text-xs leading-relaxed">
                      {piece.content.split('\n').map((line, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-3 py-1 text-sm">
                    <span>{completed}/{total}</span>
                    <div className="w-12 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-300"
                        style={{ width: `${(completed / total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Puzzle piece border */}
                <div className="absolute inset-0 border-2 border-white/40 transition-all duration-300"></div>
                
                {/* Glow effect when unlocked */}
                {isUnlocked && (
                  <>
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,215,0,0.6)] animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-transparent to-green-300/20 animate-pulse"></div>
                  </>
                )}

                {/* Chưa unlock - overlay che */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🔒</div>
                      <div className="text-sm font-bold">CHƯA MỞ KHÓA</div>
                      <div className="text-xs opacity-75 mt-1">Hoàn thành 3/3 quiz</div>
                    </div>
                  </div>
                )}

                {/* Sparkle effect for completed pieces */}
                {isUnlocked && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Center emblem */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-400">
            <span className="text-yellow-300 text-3xl animate-pulse">⭐</span>
          </div>
        </div>
      </div>

      {/* Debug controls - chỉ hiện khi dev
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-bold text-yellow-800 mb-2">🔧 Debug Controls</h4>
          <div className="flex gap-2 flex-wrap">
            <button 
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              onClick={() => {
                localStorage.removeItem('museum_progress_v2');
                localStorage.removeItem('playerName');
                localStorage.removeItem('startTimestamp');
                window.location.reload();
              }}
            >
              Reset Progress
            </button>
            <button 
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              onClick={() => {
                // Unlock tất cả milestones để test
                const allMilestones = TIMELINE.flatMap(phase => phase.milestones.map(m => m.id));
                allMilestones.forEach(id => unlockPiece(id));
              }}
            >
              Unlock All
            </button>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => {
                console.log('Current state:', { unlockedPieces, completedPhases, isCompleted, playerName, startTimestamp, completionTimestamp });
                console.log('All milestone IDs:', TIMELINE.flatMap(phase => phase.milestones.map(m => m.id)));
              }}
            >
              Log State
            </button>
            <button 
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
              onClick={() => {
                // Test completion manually
                if (!playerName) {
                  localStorage.setItem('playerName', 'Test User');
                }
                if (!startTimestamp) {
                  localStorage.setItem('startTimestamp', (Date.now() - 60000).toString());
                }
                window.location.reload();
              }}
            >
              Set Test Data
            </button>
          </div>
        </div>
      )} */}

      {/* Notification khi có pieces được unlock */}
      {unlockedPhases.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white shadow-lg border-l-4 border-yellow-400">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">🎉</span>
            <div>
              <div className="font-bold text-lg">Chúc mừng! Đã mở khóa {unlockedPhases.length}/{totalPhases} mảnh ghép!</div>
              <div className="text-green-100">
                {unlockedPhases.map(phase => phase.yearRange).join(', ')} đã được khôi phục
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress summary */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-base font-bold text-slate-700">Tiến độ khôi phục:</span>
          <span className="text-base font-bold text-red-600">
            {unlockedPhases.length}/{totalPhases} mảnh ghép
          </span>
        </div>
        <div className="bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full transition-all duration-500 relative shadow-lg"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hướng dẫn chi tiết */}
      <div className="mb-8 p-6 bg-blue-50/80 rounded-2xl border border-blue-200 shadow-lg">
        <h3 className="text-lg font-bold text-blue-700 mb-3">📋 Hướng dẫn thu thập</h3>
        <ul className="text-base text-slate-700 space-y-2">
          <li>• Mỗi giai đoạn có <strong>3 cột mốc</strong> cần khám phá</li>
          <li>• Hoàn thành quiz của cả 3 cột mốc → Nhận 1 mảnh ghép</li>
          <li>• Tổng cộng: 5 giai đoạn = 5 mảnh ghép</li>
          <li>• Mục tiêu: Ghép thành bức tranh toàn cảnh lịch sử Đảng</li>
        </ul>
      </div>

      {/* Completion celebration */}
      {(isCompleted || isCompletedLocal) ? (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-4xl mb-3">🎉🏆🎊</div>
            <h3 className="text-2xl font-bold text-white mb-3">Chúc mừng! Bộ sưu tập hoàn thành!</h3>
            <p className="text-green-100 mb-4">
              Bạn đã ghép đủ 5 mảnh lịch sử tạo thành <strong>bức tranh toàn cảnh Đảng Cộng sản Việt Nam 1930-nay</strong>
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button 
                onClick={() => setShowPanorama(true)}
                className="px-6 py-2 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition"
              >
                🖼️ Xem Panorama
              </button>
              <button 
                onClick={() => setShowCertificate(true)}
                className="px-6 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition"
              >
                📜 Chứng nhận hoàn thành
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50/80 rounded-2xl p-6 text-center border border-blue-200 shadow-lg">
          <p className="text-blue-700 font-bold text-lg">
            🎯 Tiếp tục khám phá để thu thập thêm mảnh ghép!
          </p>
          <p className="text-slate-600 text-base mt-2">
            Còn lại {totalPhases - unlockedPhases.length} giai đoạn cần hoàn thành
          </p>
        </div>
      )}
      
      {/* Certificate Modal */}
      {showCertificate && (
        <Certificate onClose={() => setShowCertificate(false)} />
      )}

      {/* Panorama Modal */}
      {showPanorama && (
        <Panorama onClose={() => setShowPanorama(false)} />
      )}
    </div>
  );
};

export default PuzzleUnlock;
