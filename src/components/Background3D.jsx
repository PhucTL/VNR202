import React, { useEffect } from 'react';

const Background3D = () => {
  useEffect(() => {
    // Tạo particles động
    const createParticles = () => {
      const particlesContainer = document.querySelector('.floating-particles');
      if (!particlesContainer) return;

      // Xóa particles cũ
      particlesContainer.innerHTML = '';

      // Tạo 12 particles
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position và delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        // Random size và color
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const colors = [
          'rgba(255, 215, 0, 0.6)',
          'rgba(220, 38, 38, 0.4)',
          'rgba(255, 255, 255, 0.3)',
          'rgba(247, 147, 22, 0.5)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
      }
    };

    // Tạo light element
    const createLight = () => {
      let lightElement = document.querySelector('.background-3d-light');
      if (!lightElement) {
        lightElement = document.createElement('div');
        lightElement.className = 'background-3d-light';
        document.body.appendChild(lightElement);
      }
    };

    // Tạo particles container
    const createParticlesContainer = () => {
      let particlesContainer = document.querySelector('.floating-particles');
      if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        document.body.appendChild(particlesContainer);
      }
    };

    // Khởi tạo
    createLight();
    createParticlesContainer();
    createParticles();

    // Tái tạo particles mỗi 30 giây
    const interval = setInterval(createParticles, 30000);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, []);

  return null; // Component này chỉ tạo DOM elements, không render gì
};

export default Background3D;