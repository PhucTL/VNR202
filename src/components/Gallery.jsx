import React, { useState } from 'react';
import ModalMedia from './ModalMedia';
import Quiz from './Quiz';
import { useProgress } from '../context/ProgressContext';

export default function Gallery({ phase, phaseIndex }) {
  const [active, setActive] = useState(null);
  const [showQuizFor, setShowQuizFor] = useState(null);
  const { unlockPiece } = useProgress();

  const openEvent = (evt) => setActive(evt);
  const close = () => { setActive(null); setShowQuizFor(null); };

  return (
    <div className="mt-6">
      <h3 className="text-xl sm:text-2xl font-semibold text-white">{phase.title}</h3>
      <p className="text-sm text-slate-300 mt-1 mb-4">{phase.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {phase.events.map((ev, idx) => (
          <div key={ev.id} className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-200" onClick={() => openEvent(ev)}>
            <div className="h-32 sm:h-40 bg-slate-800 rounded-md flex items-center justify-center overflow-hidden mb-3">
              {ev.type === 'image' ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={ev.src} alt={ev.title} className="w-full h-full object-cover" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }} />
              ) : null}
              <div className="text-sm text-slate-300 font-medium" style={{ display: ev.type === 'image' ? 'none' : 'flex' }}>
                {ev.type.toUpperCase()}
              </div>
            </div>
            <div className="text-sm text-white font-medium mb-1">{ev.title}</div>
            <div className="text-xs text-slate-400 mb-3 line-clamp-2">{ev.caption}</div>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 bg-amber-400 text-black rounded text-xs font-medium hover:bg-amber-300 transition" 
                onClick={(e) => { e.stopPropagation(); setShowQuizFor(idx); }}
              >
                Quiz
              </button>
            </div>
          </div>
        ))}
      </div>

      {active && <ModalMedia item={active} onClose={close} />}

      {showQuizFor !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={close}>
          <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h3 className="font-bold text-slate-900">Quiz cho {phase.title}</h3>
            </div>
            <Quiz
              question={{ text: `Câu hỏi về ${phase.title}: Giai đoạn này có ý nghĩa gì? (Demo: chọn A)`, correct: 'A' }}
              options={[
                { value: 'A', label: 'Có ý nghĩa quan trọng trong lịch sử' }, 
                { value: 'B', label: 'Chỉ là sự kiện bình thường' },
                { value: 'C', label: 'Không có ý nghĩa gì đặc biệt' }
              ]}
              onCorrect={() => { 
                unlockPiece(phaseIndex); 
                setShowQuizFor(null);
                alert(`Chúc mừng! Bạn đã mở khóa mảnh ghép ${phaseIndex + 1}`);
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
