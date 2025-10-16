import React from 'react';

export default function ModalMedia({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-[95%]" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <button className="text-sm text-slate-600" onClick={onClose}>Đóng</button>
          </div>
          <div className="mt-3">
            {item.type === 'image' && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={item.src} alt={item.title} className="w-full rounded-md bg-slate-100" />
            )}

            {item.type === 'video' && (
              <video controls className="w-full rounded-md bg-black">
                <source src={item.src} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>
            )}

            {item.type === 'audio' && (
              <audio controls className="w-full">
                <source src={item.src} type="audio/mpeg" />
                Trình duyệt không hỗ trợ audio.
              </audio>
            )}
          </div>
          {item.caption && <div className="mt-3 text-sm text-slate-600">{item.caption}</div>}
        </div>
      </div>
    </div>
  );
}
