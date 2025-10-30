import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import TIMELINE from '../data/timeline';
import Timeline from '../components/Timeline';
import Gallery from '../components/Gallery';
import PuzzleUnlock from '../components/PuzzleUnlock';

const Main = memo(() => {
  const [selected, setSelected] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    // Cuộn lên đầu trang khi component được mount
    window.scrollTo(0, 0);
  }, []); // Empty dependency array means this runs once when component mounts

  const handleSelectPhase = useCallback((index) => {
    setSelected(index);
    // Auto scroll to gallery
    setTimeout(() => {
      if (galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  return (
    <div className="museum-content">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-red-500 mb-2">
            🏛️ Dấu ấn Cách mạng
          </h1>
          <div className="text-lg text-slate-700">
            Lịch sử Đảng Cộng sản Việt Nam 1930–nay
          </div>
        </div>
        <div className="flex justify-center sm:justify-end mt-4 sm:mt-0">
          <a
            href="https://dauancachmang-3dmuseum.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-elegant flex items-center gap-2 px-6 py-3 text-lg font-bold rounded-2xl shadow-lg hover:scale-105 transition-all"
            style={{ background: 'linear-gradient(90deg, #dc2626, #f97316, #eab308)', color: '#fff' }}
          >
            <span role="img" aria-label="3D">🧊</span>
            Truy cập Bảo tàng 3D
          </a>
        </div>
      </header>

      <main className="space-y-6">        
        <Timeline timeline={TIMELINE} onSelect={handleSelectPhase} activeIndex={selected} />

        <section ref={galleryRef}>
          <Gallery phase={TIMELINE[selected]} phaseIndex={selected} />
        </section>

        <section>
          <PuzzleUnlock />
        </section>
      </main>
    </div>
  );
});

export default Main;