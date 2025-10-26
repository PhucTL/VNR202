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
    <div className="mt-8">
      <div className="mb-8 p-6 bg-white/90 rounded-2xl border border-red-200 shadow-lg">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
          🏛️ {phase.title}
        </h3>
        <p className="text-base text-slate-600 mt-2 mb-4">{phase.description}</p>
        <div className="text-sm text-red-600 font-medium">
          🧩 Khám phá {milestones.length} cột mốc lịch sử • Hoàn thành quiz để nhận mảnh ghép
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone, idx) => {
          const category = milestone.category || 'event';
          return (
            <div 
              key={milestone.id} 
              className="bg-white/90 rounded-2xl p-6 cursor-pointer hover:bg-white transition-all duration-200 border border-slate-200 hover:border-red-300 hover:shadow-xl group transform hover:scale-105" 
              onClick={() => openMilestone(milestone)}
            >
              <div className="h-40 sm:h-48 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-4 relative">
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
                    <div className="hidden text-base text-slate-600 font-medium items-center justify-center">
                      {milestone.type.toUpperCase()}
                    </div>
                  </>
                ) : (
                  <div className="text-base text-slate-600 font-medium flex items-center justify-center">
                    {milestone.type === 'audio' ? '🎵' : '🎬'} {milestone.type.toUpperCase()}
                  </div>
                )}
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-3 py-2 rounded-full text-sm font-bold text-white ${categoryColors[category]} shadow-lg`}>
                  {categoryIcons[category]} {categoryLabels[category]}
                </div>
              </div>
              
              <div className="text-base text-slate-800 font-bold mb-2 line-clamp-2">{milestone.title}</div>
              <div className="text-sm text-slate-600 mb-4 line-clamp-2">{milestone.caption}</div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2 shadow-lg" 
                  onClick={(e) => { e.stopPropagation(); setShowQuizFor(idx); }}
                >
                  🧠 Quiz
                </button>
                <button 
                  className="px-4 py-3 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition shadow-lg" 
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 pb-[500px]" onClick={close}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg">🧠 Quiz: {phase.title}</h3>
              <div className="text-sm text-slate-600 mt-2">Cột mốc: {milestones[showQuizFor]?.title}</div>
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
                const milestoneId = milestones[showQuizFor]?.id;
                console.log('🎯 Quiz completed! Unlocking milestone:', milestoneId);
                console.log('Milestone object:', milestones[showQuizFor]);
                unlockPiece(milestoneId); 
                setShowQuizFor(null);
                alert(`🎉 Chúc mừng! Bạn đã hoàn thành cột mốc "${milestones[showQuizFor]?.title}"`);
              }}
              onWrong={() => { /* noop */ }}
            />
            <div className="p-6 border-t border-slate-200">
              <button 
                className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition font-medium"
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
