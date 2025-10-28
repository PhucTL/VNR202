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
      {/* Hero Section - Tối ưu hóa */}
      <section className="hero-section mb-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-red-700 mb-4">
            {hero.title}
          </h1>
          <h2 className="text-2xl md:text-3xl text-red-600 font-semibold mb-4">
            {hero.subtitle}
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {hero.description}
          </p>
        </div>
      </section>

      {/* Content Sections - UI đẹp hơn */}
      <section className="content-sections mb-12 space-y-8">
        <div className="bg-white bg-opacity-95 p-6 rounded-xl shadow-lg border border-red-100">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
            {partyFoundation.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {partyFoundation.content.map(item => (
                <div key={item.id} className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <img 
              src={partyFoundation.image} 
              alt="Thành lập Đảng"
              className="rounded-xl w-full h-128 object-cover shadow-md"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/suradoicuaDCSVN.png';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            />
          </div>
        </div>

        <div className="bg-white bg-opacity-95 p-6 rounded-xl shadow-lg border border-orange-100">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
            {projectName.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <img 
              src={projectName.image} 
              alt="Dấu ấn Cách mạng"
              className="rounded-xl w-full h-128 object-cover shadow-md order-2 md:order-1"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/cachmang.png';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            />
            <div className="space-y-4 order-1 md:order-2">
              {projectName.content.map(item => (
                <div key={item.id} className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-95 p-6 rounded-xl shadow-lg border border-yellow-100">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
            {vision.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {vision.content.map(item => (
                <div key={item.id} className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <img 
              src={vision.image} 
              alt="Tầm nhìn và Mục tiêu"
              className="rounded-xl w-full h-128 object-cover shadow-md"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/tamnhinDCSVN.png';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section - UI thân thiện */}
      <section className="cta-section mt-12 text-center">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-3xl font-bold mb-4">🏛️ Khám phá Bảo tàng Ảo</h2>
          <p className="text-xl mb-6 opacity-95">
            Khám phá 5 mốc lịch sử quan trọng và nhận chứng chỉ hoàn thành đặc biệt!
          </p>
          {!showForm && !showPlayerChoice && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-red-600 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              🚀 Bắt đầu khám phá ngay
            </button>
          )}
        </div>

        {/* Player Choice - UI cải tiến */}
        {showPlayerChoice && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 p-6 rounded-2xl max-w-lg mx-auto mb-8 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              👋 Chào mừng trở lại!
            </h3>
            
            <div className="bg-white p-4 rounded-xl border border-blue-200 mb-6">
              <p className="text-gray-600 text-sm mb-1">Tên đã lưu:</p>
              <p className="text-xl font-bold text-blue-700">
                🎯 {existingPlayer}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleContinueAsExisting}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                ✅ Tiếp tục hành trình
              </button>
              <button
                onClick={handleStartNew}
                className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                🆕 Bắt đầu mới
              </button>
            </div>
          </div>
        )}

        {/* Form - UI thân thiện */}
        {showForm && (
          <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl max-w-md mx-auto shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              🎯 Bắt đầu hành trình khám phá
            </h3>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-3">
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
                className={`w-full px-4 py-3 border-2 ${nameError ? 'border-red-400' : 'border-gray-300'} rounded-xl outline-none focus:border-red-500 transition-colors duration-200 text-lg`}
                onKeyPress={(e) => e.key === 'Enter' && handleStartExploring()}
                maxLength={50}
              />
              
              {nameError && (
                <p className="text-red-600 text-sm mt-2">
                  ⚠️ {nameError}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleStartExploring}
                disabled={!playerName.trim() || playerName.trim().length < 2}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-xl font-semibold disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                🧭 Bắt đầu khám phá
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setPlayerName('');
                  setNameError('');
                  if (existingPlayer) setShowPlayerChoice(true);
                }}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
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