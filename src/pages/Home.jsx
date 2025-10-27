import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import HOME_CONTENT from '../data/homeContent';

const Home = memo(() => {
  const [showForm, setShowForm] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState('');
  const [existingPlayer, setExistingPlayer] = useState(null);
  const [showPlayerChoice, setShowPlayerChoice] = useState(false);
  const navigate = useNavigate();

  // Memoize content để tránh re-calculations
  const { hero, partyFoundation, projectName, vision } = useMemo(() => HOME_CONTENT, []);

  // Kiểm tra localStorage khi component load
  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    const savedStart = localStorage.getItem('startTimestamp');
    const savedProgress = localStorage.getItem('museum_progress_v2');
    
    if (savedName && (savedStart || savedProgress)) {
      setExistingPlayer(savedName);
      setShowPlayerChoice(true);
    }
  }, []);

  // Memoize callbacks để tránh re-renders
  const handleStartExploring = useCallback(() => {
    const trimmedName = playerName.trim();
    
    // Validate tên người dùng
    if (!trimmedName) {
      setNameError('Vui lòng nhập tên trước khi bắt đầu!');
      setTimeout(() => setNameError(''), 3000);
      return;
    }
    
    if (trimmedName.length < 2) {
      setNameError('Tên phải có ít nhất 2 ký tự!');
      setTimeout(() => setNameError(''), 3000);
      return;
    }
    
    if (trimmedName.length > 50) {
      setNameError('Tên không được quá 50 ký tự!');
      setTimeout(() => setNameError(''), 3000);
      return;
    }

    // Lưu thông tin người chơi và thời gian bắt đầu
    localStorage.setItem('playerName', trimmedName);
    localStorage.setItem('startTimestamp', Date.now().toString());
    
    navigate('/main');
  }, [playerName, navigate]);

  const handleContinueAsExisting = useCallback(() => {
    navigate('/main');
  }, [navigate]);

  const handleStartNew = useCallback(() => {
    // Xóa dữ liệu cũ và bắt đầu mới
    localStorage.removeItem('playerName');
    localStorage.removeItem('startTimestamp');
    localStorage.removeItem('museum_progress_v2');
    
    setExistingPlayer(null);
    setShowPlayerChoice(false);
    setShowForm(true);
  }, []);

  return (
    <div className="museum-content">
      {/* Hero Section - Simplified */}
      <section className="hero-section mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-3">
          {hero.title}
        </h1>
        <h2 className="text-xl text-slate-700 mb-3">
          {hero.subtitle}
        </h2>
        <p className="text-base text-slate-600">
          {hero.description}
        </p>
      </section>

      {/* Content Sections - Super Simplified */}
      <section className="content-sections mb-8 space-y-6">
        <div className="bg-white/70 p-4 rounded">
          <h2 className="text-xl font-bold text-red-700 mb-3">
            {partyFoundation.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {partyFoundation.content.map(item => (
                <div key={item.id}>
                  <h3 className="font-semibold text-red-800 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 text-xs">{item.text}</p>
                </div>
              ))}
            </div>
            <img 
              src={partyFoundation.image} 
              alt="Thành lập Đảng"
              className="rounded w-full h-128 object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/suradoicuaDCSVN.png';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            />
          </div>
        </div>

        <div className="bg-white/70 p-4 rounded">
          <h2 className="text-xl font-bold text-red-700 mb-3">
            {projectName.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <img 
              src={projectName.image} 
              alt="Dấu ấn Cách mạng"
              className="rounded w-full h-128 object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/cachmang.png';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            />
            <div className="space-y-2">
              {projectName.content.map(item => (
                <div key={item.id}>
                  <h3 className="font-semibold text-red-800 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 text-xs">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/70 p-4 rounded">
          <h2 className="text-xl font-bold text-red-700 mb-3">
            {vision.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {vision.content.map(item => (
                <div key={item.id}>
                  <h3 className="font-semibold text-red-800 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 text-xs">{item.text}</p>
                </div>
              ))}
            </div>
            <img 
              src={vision.image} 
              alt="Tầm nhìn và Mục tiêu"
              className="rounded w-full h-128 object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/tamnhinDCSVN.png';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra Simplified */}
      <section className="cta-section mt-8 text-center">
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          <h2 className="text-xl font-bold mb-2">🏛️ Khám phá Bảo tàng Ảo</h2>
          <p className="mb-3">
            Khám phá 5 mốc lịch sử và nhận chứng chỉ hoàn thành!
          </p>
          {!showForm && !showPlayerChoice && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-white text-red-600 font-semibold rounded fast-hover"
            >
              🚀 Khám phá ngay
            </button>
          )}
        </div>

        {/* Player Choice - Ultra Simplified */}
        {showPlayerChoice && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded max-w-md mx-auto mb-4">
            <h3 className="text-lg font-bold text-blue-800 mb-2 text-center">
              👋 Chào mừng trở lại!
            </h3>
            
            <div className="bg-white p-3 rounded border mb-3">
              <p className="text-gray-700 text-sm">Tên đã lưu:</p>
              <p className="text-base font-bold text-blue-600">
                🎯 {existingPlayer}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleContinueAsExisting}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded text-sm font-semibold"
              >
                ✅ Tiếp tục
              </button>
              <button
                onClick={handleStartNew}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded text-sm font-semibold"
              >
                🆕 Bắt đầu mới
              </button>
            </div>
          </div>
        )}

        {/* Form - Ultra Simplified */}
        {showForm && (
          <div className="bg-white border border-gray-200 p-4 rounded max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
              🎯 Bắt đầu khám phá
            </h3>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên của bạn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  if (nameError) setNameError('');
                }}
                placeholder="Nhập tên của bạn"
                className={`w-full px-3 py-2 border ${nameError ? 'border-red-400' : 'border-gray-300'} rounded focus:border-blue-500 focus:outline-none text-sm`}
                onKeyPress={(e) => e.key === 'Enter' && handleStartExploring()}
                maxLength={50}
              />
              
              {nameError && (
                <p className="text-red-600 text-xs mt-1">
                  ⚠️ {nameError}
                </p>
              )}
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={handleStartExploring}
                disabled={!playerName.trim() || playerName.trim().length < 2}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-sm font-semibold rounded disabled:cursor-not-allowed"
              >
                🧭 Bắt đầu
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setPlayerName('');
                  setNameError('');
                  if (existingPlayer) setShowPlayerChoice(true);
                }}
                className="px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded"
              >
                ← Quay lại
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
});

export default Home;