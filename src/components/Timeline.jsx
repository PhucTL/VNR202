import React from 'react';

export default function Timeline({ timeline, onSelect, activeIndex = 0 }) {
  return (
    <div className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {timeline.map((t, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(idx)}
              className={`p-3 rounded-lg text-left transition transform hover:scale-105 ${active ? 'bg-amber-500 text-slate-900 scale-105' : 'bg-white/5 text-white hover:bg-white/10'}`}
            >
              <div className="text-xs font-semibold mb-1">{t.yearRange}</div>
              <div className="text-sm font-bold leading-tight">{t.title}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
