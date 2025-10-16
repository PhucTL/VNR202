import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';

const IMAGE_URL = 'https://bcp.cdnchinhphu.vn/thumb_w/777/334894974524682240/2025/6/30/tphcm-1-1751245519173693919081.jpg';
const VIDEO_URLS = Array.from({ length: 6 }).map((_, i) => `/assets/puzzle-v${i + 1}.mp4`);

export default function PuzzleUnlock() {
  const { unlockedPieces, unlockPiece } = useProgress();
  const [activePiece, setActivePiece] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const videoRef = useRef(null);

  const openPiece = (i) => {
    if (unlockedPieces[i]) return;
    setActivePiece(i);
    setVideoEnded(false);
    setQuizAnswer('');
    setTimeout(() => videoRef.current && videoRef.current.play().catch(() => {}), 100);
  };

  const submit = () => {
    if (quizAnswer.trim().toUpperCase() === 'A') {
      unlockPiece(activePiece);
      close();
    } else alert('Sai rồi. Thử lại');
  };

  const close = () => { setActivePiece(null); setVideoEnded(false); setQuizAnswer(''); };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white mb-4">Bộ sưu tập ghép ảnh</h2>
      <div className="mb-4">
        <div className="bg-white/10 rounded-full h-2">
          <div 
            className="bg-amber-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedPieces.filter(Boolean).length / 6) * 100}%` }}
          />
        </div>
        <div className="text-sm text-slate-300 mt-2">
          Tiến độ: {unlockedPieces.filter(Boolean).length}/6 mảnh đã mở khóa
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => {
          const isUnlocked = unlockedPieces[i];
          const cols = 3, rows = 2;
          const xPos = (i % cols) * (-100 / (cols - 1));
          const yPos = Math.floor(i / cols) * (-100 / (rows - 1));

          return (
            <div 
              key={i} 
              className={`relative h-32 sm:h-40 rounded overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 ${isUnlocked ? 'scale-100' : 'scale-95 hover:scale-100'}`}
              onClick={() => openPiece(i)}
            >
              <div
                style={{ 
                  backgroundImage: `url(${IMAGE_URL})`, 
                  backgroundSize: `${cols * 100}% ${rows * 100}%`, 
                  backgroundPosition: `${xPos}% ${yPos}%` 
                }}
                className={`w-full h-full transition-all duration-300 ${isUnlocked ? '' : 'filter blur-sm brightness-75'}`}
              />
              {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 backdrop-blur-sm">
                  <div className="text-lg font-bold mb-2">Mảnh {i + 1}</div>
                  <div className="text-xs text-center mb-3 px-2">Xem video & quiz để mở khóa</div>
                  <button 
                    className="px-3 py-1 rounded bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition transform hover:scale-105" 
                    onClick={(e) => { e.stopPropagation(); openPiece(i); }}
                  >
                    Mở khóa
                  </button>
                </div>
              )}
              {isUnlocked && (
                <div className="absolute top-2 right-2 text-xs bg-green-500 text-white rounded-full px-2 py-1 font-bold">
                  ✓ MỞ
                </div>
              )}
            </div>
          );
        })}
      </div>

      {unlockedPieces.filter(Boolean).length === 6 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-center">
          <h3 className="text-xl font-bold text-black mb-2">🎉 Chúc mừng!</h3>
          <p className="text-black">Bạn đã hoàn thành bộ sưu tập! Tất cả mảnh ghép đã được mở khóa.</p>
        </div>
      )}

      {activePiece !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={close}>
          <div className="bg-white rounded-lg w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h3 className="font-bold text-lg">Video mảnh {activePiece + 1}</h3>
            </div>
            <div className="p-4">
              <video ref={videoRef} controls onEnded={() => setVideoEnded(true)} className="w-full bg-black rounded">
                <source src={VIDEO_URLS[activePiece]} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>

              {!videoEnded && (
                <div className="mt-3 text-slate-600 text-center">
                  📹 Xem hết video để mở quiz
                </div>
              )}

              {videoEnded && (
                <div className="mt-4">
                  <div className="text-sm mb-3 font-medium">
                    🧠 Quiz: Về nội dung video vừa xem (Demo: đáp án đúng = A)
                  </div>
                  <input 
                    value={quizAnswer} 
                    onChange={(e) => setQuizAnswer(e.target.value)} 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
                    placeholder="Nhập A, B, hoặc C..." 
                  />
                  <div className="mt-3 flex gap-3">
                    <button 
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium" 
                      onClick={submit}
                    >
                      Nộp câu trả lời
                    </button>
                    <button 
                      className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition" 
                      onClick={close}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
