import React, { useState } from 'react';
import ModalMedia from './ModalMedia';
import Quiz from './Quiz';
import { useProgress } from '../context/ProgressContext';

const categoryIcons = {
  event: '⚡',
  character: '👤', 
  ideology: '💭'
};

const categoryLabels = {
  event: 'Sự kiện',
  character: 'Nhân vật',
  ideology: 'Tư tưởng'
};

const categoryColors = {
  event: 'bg-red-500',
  character: 'bg-blue-500', 
  ideology: 'bg-purple-500'
};

export default function Gallery({ phase, phaseIndex }) {
  const [active, setActive] = useState(null);
  const [showQuizFor, setShowQuizFor] = useState(null);
  const { unlockPiece } = useProgress();

  const openMilestone = (milestone) => setActive(milestone);
  const close = () => { setActive(null); setShowQuizFor(null); };

  const milestones = phase.milestones || phase.events || []; // backward compatibility

  return (
    <div className="mt-6">
      <div className="mb-6 p-4 bg-white/5 rounded-lg border border-amber-500/30">
        <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
          🏛️ {phase.title}
        </h3>
        <p className="text-sm text-slate-300 mt-1 mb-3">{phase.description}</p>
        <div className="text-xs text-amber-300">
          🧩 Khám phá {milestones.length} cột mốc lịch sử • Hoàn thành quiz để nhận mảnh ghép
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((milestone, idx) => {
          const category = milestone.category || 'event';
          return (
            <div 
              key={milestone.id} 
              className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-amber-500/50 group" 
              onClick={() => openMilestone(milestone)}
            >
              <div className="h-32 sm:h-40 bg-slate-800 rounded-md flex items-center justify-center overflow-hidden mb-3 relative">
                {milestone.type === 'image' ? (
                  <>
                    <img 
                      src={milestone.src} 
                      alt={milestone.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }} 
                    />
                    <div className="hidden text-sm text-slate-300 font-medium items-center justify-center">
                      {milestone.type.toUpperCase()}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-slate-300 font-medium flex items-center justify-center">
                    {milestone.type === 'audio' ? '🎵' : '🎬'} {milestone.type.toUpperCase()}
                  </div>
                )}
                
                {/* Category Badge */}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold text-white ${categoryColors[category]}`}>
                  {categoryIcons[category]} {categoryLabels[category]}
                </div>
              </div>
              
              <div className="text-sm text-white font-medium mb-1 line-clamp-2">{milestone.title}</div>
              <div className="text-xs text-slate-400 mb-3 line-clamp-2">{milestone.caption}</div>
              
              <div className="flex gap-2">
                <button 
                  className="flex-1 px-3 py-1 bg-amber-400 text-black rounded text-xs font-medium hover:bg-amber-300 transition flex items-center justify-center gap-1" 
                  onClick={(e) => { e.stopPropagation(); setShowQuizFor(idx); }}
                >
                  🧠 Quiz
                </button>
                <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-400 transition" 
                  onClick={(e) => { e.stopPropagation(); openMilestone(milestone); }}
                >
                  📖 Chi tiết
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {active && <ModalMedia item={active} onClose={close} />}

      {showQuizFor !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={close}>
          <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h3 className="font-bold text-slate-900">🧠 Quiz: {phase.title}</h3>
              <div className="text-sm text-slate-600 mt-1">Cột mốc: {milestones[showQuizFor]?.title}</div>
            </div>
            <Quiz
              question={{ 
                text: `Về cột mốc "${milestones[showQuizFor]?.title}": Ý nghĩa lịch sử của sự kiện này là gì? (Demo: chọn A)`, 
                correct: 'A' 
              }}
              options={[
                { value: 'A', label: 'Có ý nghĩa quan trọng, đánh dấu bước ngoặt lịch sử' }, 
                { value: 'B', label: 'Chỉ là sự kiện bình thường trong dòng lịch sử' },
                { value: 'C', label: 'Không có ảnh hưởng đáng kể đến lịch sử' }
              ]}
              onCorrect={() => { 
                unlockPiece(milestones[showQuizFor]?.id); 
                setShowQuizFor(null);
                alert(`🎉 Chúc mừng! Bạn đã hoàn thành cột mốc "${milestones[showQuizFor]?.title}"`);
              }}
              onWrong={() => { /* noop */ }}
            />
            <div className="p-4 border-t">
              <button 
                className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition"
                onClick={close}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
