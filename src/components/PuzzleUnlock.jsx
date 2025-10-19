import React from 'react';
import { useProgress } from '../context/ProgressContext';
import TIMELINE from '../data/timeline';

const PuzzleUnlock = () => {
  const { unlockedPieces } = useProgress();
  
  // Tính toán các mảnh ghép đã mở khóa (5 giai đoạn, mỗi giai đoạn cần hoàn thành cả 3 cột mốc)
  const totalPhases = TIMELINE.length; // 5 giai đoạn
  const unlockedPhases = TIMELINE.filter(phase => {
    // Kiểm tra xem tất cả 3 milestones trong phase này đã unlock chưa
    return phase.milestones.every(milestone => unlockedPieces.includes(milestone.id));
  });
  
  const progress = (unlockedPhases.length / totalPhases) * 100;
  const isCompleted = unlockedPhases.length === totalPhases;

  return (
    <div className="mt-8">
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          🧩 Bộ sưu tập mảnh ghép lịch sử
        </h2>
        <p className="text-sm text-slate-300">
          Hoàn thành <strong>cả 3 cột mốc</strong> trong mỗi giai đoạn để nhận 1 mảnh ghép. Mục tiêu: <strong>5 mảnh ghép toàn cảnh 1930-nay!</strong>
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-300">Tiến độ sưu tập:</span>
          <span className="text-sm font-bold text-amber-300">
            {unlockedPhases.length}/{totalPhases} mảnh ghép
          </span>
        </div>
        <div className="bg-white/10 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Grid 5 mảnh ghép tương ứng 5 giai đoạn */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {TIMELINE.map((phase, index) => {
          const isPhaseUnlocked = unlockedPhases.some(p => p.id === phase.id);
          const completedMilestones = phase.milestones.filter(m => unlockedPieces.includes(m.id)).length;
          
          return (
            <div key={phase.id} className="relative">
              <div className={`
                aspect-square rounded-lg border-2 transition-all duration-300 overflow-hidden
                ${isPhaseUnlocked 
                  ? 'border-green-400 bg-gradient-to-br from-green-100 to-blue-100 shadow-lg' 
                  : 'border-gray-300 bg-gray-100'
                }
              `}>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <div className={`text-2xl mb-1 ${isPhaseUnlocked ? 'animate-pulse' : ''}`}>
                    {isPhaseUnlocked ? '✨' : '🔒'}
                  </div>
                  <div className={`text-xs text-center font-bold ${
                    isPhaseUnlocked ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {phase.yearRange}
                  </div>
                  <div className="text-xs text-center mt-1">
                    <span className={`
                      px-1 py-0.5 rounded text-xs font-medium
                      ${isPhaseUnlocked 
                        ? 'bg-green-200 text-green-800' 
                        : completedMilestones > 0
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {completedMilestones}/3
                    </span>
                  </div>
                  {isPhaseUnlocked && (
                    <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hướng dẫn chi tiết */}
      <div className="mb-6 p-4 bg-blue-50/10 rounded-lg border border-blue-400/30">
        <h3 className="text-lg font-bold text-blue-300 mb-2">📋 Hướng dẫn thu thập</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Mỗi giai đoạn có <strong>3 cột mốc</strong> cần khám phá</li>
          <li>• Hoàn thành quiz của cả 3 cột mốc → Nhận 1 mảnh ghép</li>
          <li>• Tổng cộng: 5 giai đoạn = 5 mảnh ghép</li>
          <li>• Mục tiêu: Ghép thành bức tranh toàn cảnh lịch sử Đảng</li>
        </ul>
      </div>

      {/* Completion celebration */}
      {isCompleted ? (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-4xl mb-3">🎉🏆🎊</div>
            <h3 className="text-2xl font-bold text-white mb-3">Chúc mừng! Bộ sưu tập hoàn thành!</h3>
            <p className="text-green-100 mb-4">
              Bạn đã ghép đủ 5 mảnh lịch sử tạo thành <strong>bức tranh toàn cảnh Đảng Cộng sản Việt Nam 1930-nay</strong>
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="px-6 py-2 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition">
                🖼️ Xem Panorama
              </button>
              <button className="px-6 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition">
                📜 Chứng nhận hoàn thành
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50/10 rounded-lg p-4 text-center border border-blue-400/30">
          <p className="text-blue-300 font-medium">
            🎯 Tiếp tục khám phá để thu thập thêm mảnh ghép!
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Còn lại {totalPhases - unlockedPhases.length} giai đoạn cần hoàn thành
          </p>
        </div>
      )}
    </div>
  );
};

export default PuzzleUnlock;
