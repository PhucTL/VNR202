import React, { useState, useRef } from 'react';
import TIMELINE from '../data/timeline';
import Timeline from '../components/Timeline';
import Gallery from '../components/Gallery';
import PuzzleUnlock from '../components/PuzzleUnlock';

export default function Home() {
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
    <div className="museum-content">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-6 sm:mb-0 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-red-600 mb-2">
            🏛️ Dấu ấn Cách mạng
          </h1>
          <div className="text-lg sm:text-xl text-slate-700 font-medium">
            Lịch sử Đảng Cộng sản Việt Nam 1930–nay — Bảo tàng số tương tác
          </div>
          <div className="text-sm text-slate-500 mt-2">
            🧩 Thu thập mảnh ghép lịch sử • 🎧 Nghe thuyết minh sinh động
          </div>
        </div>
        <nav className="flex gap-3">
          <button className="px-4 py-3 bg-red-500/20 rounded-xl text-red-700 text-base font-semibold hover:bg-red-500/30 transition border border-red-200">
            🎯 Khám phá
          </button>
          <button className="px-4 py-3 bg-blue-500/20 rounded-xl text-blue-700 text-base font-semibold hover:bg-blue-500/30 transition border border-blue-200">
            📚 Bộ sưu tập
          </button>
        </nav>
      </header>

      <main className="space-y-8">        
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
}