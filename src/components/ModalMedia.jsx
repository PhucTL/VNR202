import React, { useState, useEffect } from 'react';

const categoryIcons = {
  event: '⚡',
  character: '👤', 
  ideology: '💭'
};

const categoryLabels = {
  event: 'Sự kiện lịch sử',
  character: 'Nhân vật',
  ideology: 'Tư tưởng'
};

export default function ModalMedia({ item, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  if (!item) return null;

  const category = item.category || 'event';
  const details = item.details || {};
  const gallery = item.gallery || [{ src: item.src, caption: item.caption }];

  // Enhanced onClose để dừng audio khi đóng modal
  const handleClose = () => {
    window.speechSynthesis.cancel();
    setIsAudioPlaying(false);
    onClose();
  };

  // Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gallery.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gallery.length]);

  // Cleanup audio khi component unmount
  useEffect(() => {
    return () => {
      // Dừng audio khi component bị đóng
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
    };
  }, []);

  // Monitor speech synthesis status
  useEffect(() => {
    const checkSpeechStatus = () => {
      if (!window.speechSynthesis.speaking && isAudioPlaying) {
        setIsAudioPlaying(false);
      }
    };

    const interval = setInterval(checkSpeechStatus, 500);
    return () => clearInterval(interval);
  }, [isAudioPlaying]);

  // Text-to-speech function với fix lỗi lặp lại
  const playAudio = () => {
    if (!item.audioText) return;
    
    // Luôn dừng audio hiện tại trước
    window.speechSynthesis.cancel();
    
    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const speak = () => {
      // Đảm bảo dừng hoàn toàn trước khi bắt đầu
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(item.audioText);
      
      // Tìm giọng tiếng Việt tốt nhất
      const voices = window.speechSynthesis.getVoices();
      const vietnameseVoice = voices.find(voice => 
        voice.lang.includes('vi') || 
        voice.name.toLowerCase().includes('vietnam') ||
        voice.name.toLowerCase().includes('linh')
      );
      
      if (vietnameseVoice) {
        utterance.voice = vietnameseVoice;
      }
      
      // Cài đặt giọng đọc tự nhiên
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      utterance.volume = 1.0;
      
      // Event handlers với cleanup tốt hơn
      utterance.onstart = () => {
        setIsAudioPlaying(true);
      };
      
      utterance.onend = () => {
        setIsAudioPlaying(false);
        // Đảm bảo cleanup
        window.speechSynthesis.cancel();
      };
      
      utterance.onerror = (event) => {
        console.log('Speech error:', event.error);
        setIsAudioPlaying(false);
        window.speechSynthesis.cancel();
      };
      
      // Chỉ speak nếu chưa có audio đang chạy
      if (!window.speechSynthesis.speaking) {
        window.speechSynthesis.speak(utterance);
      }
    };

    // Đợi voices load xong
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speak, { once: true });
    } else {
      speak();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-[630px] z-50 overflow-y-auto" onClick={handleClose}>
      <div className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="relative flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg">
                  {categoryIcons[category]} {categoryLabels[category]}
                </div>
                {details.date && (
                  <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
                    📅 {details.date}
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-3 leading-tight">{item.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{item.caption}</p>
            </div>
            <button 
              className="ml-6 w-12 h-12 flex items-center justify-center bg-white/80 hover:bg-white text-slate-500 hover:text-slate-700 rounded-full text-2xl font-bold shadow-lg transition-all transform hover:scale-110"
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </div>

        {/* Media Content - Gallery Carousel */}
        <div className="p-8">
          {/* Audio Controls */}
          {item.audioText && (
            <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-emerald-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl">🎧</span>
                    </div>
                    {isAudioPlaying && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-emerald-800 font-bold text-xl mb-1">🎙️ Thuyết minh sinh động</h4>
                    <p className="text-emerald-600 text-sm leading-relaxed">
                      Nghe giọng đọc tự nhiên, sinh động về sự kiện lịch sử này
                    </p>
                  </div>
                </div>
                <button
                  onClick={playAudio}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
                    isAudioPlaying 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                  }`}
                >
                  {isAudioPlaying ? (
                    <div className="flex items-center gap-2">
                      <span>⏹️</span>
                      <span>Dừng ngay</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>▶️</span>
                      <span>Nghe thuyết minh</span>
                    </div>
                  )}
                </button>
              </div>
              
              {isAudioPlaying && (
                <div className="mt-4 pt-4 border-t border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 h-8 bg-emerald-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-emerald-700 font-medium">Đang phát thuyết minh...</span>
                    <div className="flex-1 h-2 bg-emerald-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative group">
              <img 
                src={gallery[currentImageIndex].src} 
                alt={gallery[currentImageIndex].caption} 
                className="w-full h-[32rem] object-cover rounded-2xl shadow-2xl bg-slate-100 transition-all duration-300" 
              />
              
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 rounded-2xl"></div>
              
              {/* Navigation arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white rounded-2xl hover:scale-110 transition-all flex items-center justify-center text-2xl font-bold shadow-2xl"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white rounded-2xl hover:scale-110 transition-all flex items-center justify-center text-2xl font-bold shadow-2xl"
                  >
                    →
                  </button>
                </>
              )}

              {/* Image counter */}
              {gallery.length > 1 && (
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-2xl text-sm font-bold shadow-xl">
                  <span className="text-blue-500">📸</span> {currentImageIndex + 1}/{gallery.length}
                </div>
              )}
            </div>

            {/* Current image caption */}
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-center text-slate-700 text-lg font-medium leading-relaxed">
                {gallery[currentImageIndex].caption}
              </p>
            </div>

            {/* Navigation hint */}
            {gallery.length > 1 && (
              <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm bg-slate-100 inline-block px-4 py-2 rounded-full">
                  💡 Dùng phím ← → hoặc click để xem thêm ảnh
                </p>
              </div>
            )}

            {/* Thumbnail navigation */}
            {gallery.length > 1 && (
              <div className="mt-6 bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-2xl">📷</span>
                  <h4 className="text-slate-700 font-bold">Bộ sưu tập ảnh</h4>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    {gallery.length} ảnh
                  </span>
                </div>
                <div className="flex justify-center gap-4 overflow-x-auto pb-2">
                  {gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all transform hover:scale-110 relative ${
                        index === currentImageIndex 
                          ? 'border-blue-500 shadow-xl ring-4 ring-blue-200' 
                          : 'border-slate-300 hover:border-blue-400 shadow-lg'
                      }`}
                    >
                      <img 
                        src={img.src} 
                        alt={img.caption} 
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <span className="text-white text-lg">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details Section */}
          {Object.keys(details).length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Basic Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  📋 <span>Thông tin chi tiết</span>
                </h4>
                
                <div className="space-y-5">
                  {details.location && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-600 text-lg">📍</span>
                        <strong className="text-blue-800 font-semibold">Địa điểm</strong>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{details.location}</p>
                    </div>
                  )}

                  {details.significance && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-600 text-lg">⭐</span>
                        <strong className="text-blue-800 font-semibold">Ý nghĩa lịch sử</strong>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{details.significance}</p>
                    </div>
                  )}

                  {details.outcome && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-600 text-lg">🎯</span>
                        <strong className="text-blue-800 font-semibold">Kết quả</strong>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{details.outcome}</p>
                    </div>
                  )}

                  {details.contribution && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-purple-600 text-lg">🏆</span>
                        <strong className="text-blue-800 font-semibold">Đóng góp</strong>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{details.contribution}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Extended Info */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200">
                <h4 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                  📚 <span>Thông tin bổ sung</span>
                </h4>
                
                <div className="space-y-5">
                  {details.keyFigures && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-purple-600 text-lg">👥</span>
                        <strong className="text-emerald-800 font-semibold">Nhân vật chủ chốt</strong>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {details.keyFigures.map((figure, idx) => (
                          <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            {figure}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {details.historicalContext && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600 text-lg">📚</span>
                        <strong className="text-emerald-800 font-semibold">Bối cảnh lịch sử</strong>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{details.historicalContext}</p>
                    </div>
                  )}

                  {details.impact && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600 text-lg">📈</span>
                        <strong className="text-emerald-800 font-semibold">Tác động</strong>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{details.impact}</p>
                    </div>
                  )}

                  {details.coreIdea && (
                    <div className="p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-indigo-600 text-lg">💡</span>
                        <strong className="text-emerald-800 font-semibold">Tư tưởng cốt lõi</strong>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{details.coreIdea}</p>
                    </div>
                  )}

                  {details.quote && (
                    <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border-l-4 border-amber-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-600 text-lg">💬</span>
                        <strong className="text-amber-800 font-semibold">Câu nói nổi bật</strong>
                      </div>
                      <p className="text-amber-800 italic text-lg leading-relaxed">"{details.quote}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gradient-to-r from-slate-50 to-slate-100 text-center">
          <button 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
            onClick={handleClose}
          >
            ✅ Đã hiểu, đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
}