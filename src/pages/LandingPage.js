// WKND Warrior Landing Page - Where legends begin 🚀
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WkndLogo from '../components/WkndLogo';
import BackendStatus from '../components/BackendStatus';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <WkndLogo size="normal" />
            <div className="text-gray-100">
              <div className="text-xl font-black">WKND WARRIOR</div>
              <div className="text-xs text-amber-400 font-semibold">CONQUER YOUR WEEKEND</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <BackendStatus />
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-gray-100 hover:text-amber-400 transition-colors font-semibold"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-all shadow-lg border-2 border-gray-800"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="mb-8">
            <WkndLogo size="large" className="mx-auto mb-6" />
            <h1 className="text-6xl font-black text-gray-100 mb-4">
              WKND WARRIOR
            </h1>
            <p className="text-2xl text-amber-400 font-bold mb-8">
              Conquer Your Weekend. Every Single Time.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              Never miss the perfect weekend again. Connect your music and select your teams. 
              We'll scan the next 6 months and find when your favorite artists and sports teams 
              are playing in the same city, on the same weekend. Epic weekends, delivered automatically.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-amber-400 text-gray-900 text-xl font-black rounded-lg hover:bg-amber-300 transition-all shadow-xl border-2 border-gray-800 transform hover:scale-105"
            >
              START CONQUERING →
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-transparent text-gray-100 text-xl font-bold border-2 border-gray-600 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-all"
            >
              I'm Ready to Battle
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 hover:border-amber-400 transition-all">
              <div className="text-3xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">Music Intelligence</h3>
              <p className="text-gray-400">Connect Spotify or Apple Music. We analyze your top 50 artists and scan 6 months of tour dates.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 hover:border-amber-400 transition-all">
              <div className="text-3xl mb-4">🏈</div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">Sports Warfare</h3>
              <p className="text-gray-400">Select your favorite NFL, NBA, MLB, and NHL teams. We track every game, every season, automatically.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 hover:border-amber-400 transition-all">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">Perfect Matches</h3>
              <p className="text-gray-400">Custom weekend definitions. Geographic matching. The algorithm finds your battles for you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <WkndLogo size="small" />
            <span className="text-gray-400 font-semibold">WKND WARRIOR</span>
          </div>
          <p className="text-gray-500">Built for warriors who refuse to waste weekends.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;