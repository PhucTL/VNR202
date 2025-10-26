import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HOME_CONTENT from '../data/homeContent';

export default function Home() {
  const { hero, partyFoundation, projectName, vision } = HOME_CONTENT;
  const [showForm, setShowForm] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleStartExploring = () => {
    if (playerName.trim()) {
      // Lưu thông tin người chơi và thời gian bắt đầu
      localStorage.setItem('playerName', playerName.trim());
      localStorage.setItem('startTimestamp', Date.now().toString());
      
      // Hiển thị thông báo và chuyển trang
      alert('Hãy hoàn thành hành trình khám phá 5 mốc để nhận chứng chỉ đặc biệt từ team!');
      navigate('/main');
    }
  };

  return (
    <div className="museum-content">
      {/* Hero Section */}
      <section className="hero-section mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-red-600 mb-4">
          {hero.title}
        </h1>
        <h2 className="text-2xl sm:text-3xl text-slate-700 font-medium mb-4">
          {hero.subtitle}
        </h2>
        <p className="text-lg text-slate-600">
          {hero.description}
        </p>
      </section>

      {/* Party Foundation Section */}
      <section className="foundation-section mb-16">
        <h2 className="text-3xl font-bold text-red-700 mb-6">
          {partyFoundation.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {partyFoundation.content.map(item => (
              <div key={item.id} className="bg-white/50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="relative">
            <img 
              src={partyFoundation.image} 
              alt="Thành lập Đảng"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Name Section */}
      <section className="project-name-section mb-16">
        <h2 className="text-3xl font-bold text-red-700 mb-6">
          {projectName.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <img 
              src={projectName.image} 
              alt="Dấu ấn Cách mạng"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            {projectName.content.map(item => (
              <div key={item.id} className="bg-white/50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <h2 className="text-3xl font-bold text-red-700 mb-6">
          {vision.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {vision.content.map(item => (
              <div key={item.id} className="bg-white/50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="relative">
            <img 
              src={vision.image} 
              alt="Tầm nhìn và Mục tiêu"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section mt-16 text-center">
        {!showForm ? (
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">🏛️ Hành trình Khám phá Bảo tàng Ảo</h2>
            <p className="text-xl mb-6">
              Khám phá 5 mốc lịch sử quan trọng và nhận chứng chỉ hoàn thành đặc biệt!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-block px-8 py-4 bg-white text-red-600 text-lg font-semibold rounded-xl shadow-md hover:bg-red-50 transition-transform transform hover:scale-105"
            >
              🚀 Khám phá ngay
            </button>
          </div>
        ) : (
          <div className="bg-white border-2 border-red-200 p-8 rounded-2xl shadow-xl max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-red-600 mb-4">🎯 Bắt đầu hành trình</h3>
            <p className="text-gray-600 mb-6">
              Nhập tên của bạn để bắt đầu khám phá và nhận chứng chỉ hoàn thành:
            </p>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none mb-4 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleStartExploring()}
            />
            <div className="flex gap-3">
              <button
                onClick={handleStartExploring}
                disabled={!playerName.trim()}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                🎯 Bắt đầu khám phá
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </section>

    <Link
        to="/main"
        className="inline-block mt-10 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
        >
        🚀 Khám phá ngay (Cũ)
    </Link>

    </div>
  );
}
