import React from 'react';

export default function Timeline({ timeline, onSelect, activeIndex = 0 }) {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          📅 Dòng thời gian lịch sử
        </h2>
        <p className="text-lg text-slate-600">
          Chọn giai đoạn để khám phá các cột mốc quan trọng
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {timeline.map((t, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(idx)}
              className={`p-6 rounded-2xl text-left transition-all transform hover:scale-105 shadow-lg border-2 ${
                active 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white scale-105 border-red-400 shadow-xl' 
                  : 'bg-white/80 text-slate-800 hover:bg-white border-slate-200 hover:shadow-xl'
              }`}
            >
              <div className={`text-sm font-bold mb-2 ${active ? 'text-red-100' : 'text-red-600'}`}>
                {t.yearRange}
              </div>
              <div className="text-base font-bold leading-tight mb-2">
                {t.title.split(':')[1]?.trim() || t.title}
              </div>
              <div className={`text-sm ${active ? 'text-red-100' : 'text-slate-600'}`}>
                {t.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
