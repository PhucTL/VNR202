import React, { useState, useRef } from 'react';
import TIMELINE from './data/timeline';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import PuzzleUnlock from './components/PuzzleUnlock';
import { ProgressProvider } from './context/ProgressContext';

function AppInner() {
  const [selected, setSelected] = useState(0);
  const galleryRef = useRef(null);

  const handleSelectPhase = (index) => {
    setSelected(index);
    // Auto scroll to gallery
    setTimeout(() => {
      if (galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
  <div className="museum-root min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-8">
      <div className="museum-container">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-300">Dấu ấn Cách mạng</h1>
            <div className="text-xs sm:text-sm text-slate-300">Lịch sử Đảng Cộng sản Việt Nam 1930–nay — Bảo tàng số tương tác</div>
          </div>
          <nav className="flex gap-2">
            <button className="px-3 py-2 bg-white/5 rounded text-white text-sm hover:bg-white/10 transition">Khám phá</button>
            <button className="px-3 py-2 bg-white/5 rounded text-white text-sm hover:bg-white/10 transition">Bộ sưu tập</button>
          </nav>
        </header>

        <main>
          <Timeline timeline={TIMELINE} onSelect={handleSelectPhase} activeIndex={selected} />

          <section ref={galleryRef} className="mt-6">
            <Gallery phase={TIMELINE[selected]} phaseIndex={selected} />
          </section>

          <section className="mt-10">
            <PuzzleUnlock />
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppInner />
    </ProgressProvider>
  );
}
