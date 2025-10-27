import React, { memo } from 'react';

const Timeline = memo(({ timeline, onSelect, activeIndex = 0 }) => {
  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          📅 Dòng thời gian lịch sử
        </h2>
        <p className="text-base text-slate-600">
          Chọn giai đoạn để khám phá các cột mốc quan trọng
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {timeline.map((t, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(idx)}
              className={`p-4 rounded-lg text-left simple-scale fast-hover border ${
                active 
                  ? 'bg-red-500 text-white border-red-400' 
                  : 'bg-white text-slate-800 border-slate-200'
              }`}
            >
              <div className={`text-sm font-bold mb-1 ${active ? 'text-red-100' : 'text-red-600'}`}>
                {t.yearRange}
              </div>
              <div className="text-sm font-bold leading-tight mb-1">
                {t.title.split(':')[1]?.trim() || t.title}
              </div>
              <div className={`text-xs ${active ? 'text-red-50' : 'text-slate-600'}`}>
                {t.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default Timeline;
