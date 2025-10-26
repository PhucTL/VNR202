import React from 'react';
import { Link } from 'react-router-dom';
import HOME_CONTENT from '../data/homeContent';

export default function Home() {
  const { hero, partyFoundation, projectName, vision } = HOME_CONTENT;

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
    <Link
        to="/main"
        className="inline-block mt-10 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
        >
        🚀 Khám phá ngay
    </Link>

    </div>
  );
}
