import React, { useState } from 'react';
import TIMELINE from '../data/timeline';

export default function Panorama({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Thu thập tất cả ảnh từ timeline
  const getAllImages = () => {
    const images = [];
    TIMELINE.forEach((phase, phaseIndex) => {
      if (phase.milestones) {
        phase.milestones.forEach((milestone, milestoneIndex) => {
          // Thêm ảnh chính
          if (milestone.src) {
            images.push({
              src: milestone.src,
              title: milestone.title || `${phase.title} - Mốc ${milestoneIndex + 1}`,
              phase: phase.title,
              description: milestone.description || '',
              phaseIndex,
              milestoneIndex
            });
          }
          
          // Thêm ảnh từ gallery
          if (milestone.gallery) {
            milestone.gallery.forEach((galleryItem, galleryIndex) => {
              images.push({
                src: galleryItem.src,
                title: galleryItem.title || `${phase.title} - Gallery ${galleryIndex + 1}`,
                phase: phase.title,
                description: galleryItem.description || '',
                phaseIndex,
                milestoneIndex,
                galleryIndex
              });
            });
          }
        });
      }
    });
    return images;
  };

  const allImages = getAllImages();

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto  mt-[1900px]">
        {/* Header */}
        <div className="p-6 rounded-xl flex justify-between items-center sticky top-0 bg-red-200 ">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              🖼️ Panorama Lịch sử
            </h2>
            <p className="text-gray-600 mt-1">Dấu ấn Cách mạng (1930-nay)</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              🏛️ Toàn cảnh hành trình lịch sử
            </h3>
            <p className="text-gray-600">
              Tổng cộng {allImages.length} hình ảnh quý giá từ {TIMELINE.length} giai đoạn lịch sử
            </p>
          </div>

          {/* Timeline overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {TIMELINE.map((phase, index) => (
              <div key={index} className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  {phase.title}
                </h4>
                <p className="text-red-700 text-sm">{phase.period}</p>
                <div className="mt-2 text-xs text-red-600">
                  {phase.milestones?.length || 0} mốc • {allImages.filter(img => img.phaseIndex === index).length} hình ảnh
                </div>
              </div>
            ))}
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => openModal(image)}
              >
                <div className="aspect-square">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">{image.title}</p>
                    <p className="text-white/80 text-xs truncate">{image.phase}</p>
                  </div>
                </div>

                {/* Phase indicator */}
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {image.phaseIndex + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Đóng Panorama
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">{selectedImage.title}</h3>
                <p className="text-gray-600 text-sm">{selectedImage.phase}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-96 object-contain rounded-lg"
              />
              {selectedImage.description && (
                <p className="mt-4 text-gray-700">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}