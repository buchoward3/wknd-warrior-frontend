// WKND Warrior Dashboard - Command Center 🪖
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import WkndLogo from '../components/WkndLogo';
import BackendStatus from '../components/BackendStatus';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await api.getUserDashboard(token);
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <WkndLogo size="large" className="mx-auto mb-4 animate-pulse" />
          <div className="text-amber-400 font-semibold">Loading your battle station...</div>
          <div className="text-gray-500 text-sm mt-2">Connecting to backend...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <WkndLogo size="large" className="mx-auto mb-4" />
          <div className="text-red-400 font-semibold">Error loading dashboard</div>
          <div className="text-gray-400 text-sm mt-2">{error}</div>
          <button 
            onClick={loadUserData}
            className="mt-4 px-4 py-2 bg-amber-400 text-gray-900 font-bold rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b-2 border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <WkndLogo size="normal" />
            <div className="text-gray-100">
              <div className="text-lg font-black">WKND WARRIOR</div>
              <div className="text-xs text-amber-400">COMMAND CENTER</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <BackendStatus />
            <span className="text-gray-300">Welcome, <span className="text-amber-400 font-semibold">{userData?.username || user?.username}</span></span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-700 text-gray-100 font-semibold rounded border-2 border-gray-600 hover:border-amber-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-100 mb-2">
            Welcome Back, Warrior
          </h1>
          <p className="text-xl text-amber-400 font-semibold">Ready to find your next perfect weekend?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">🎵 Artists Connected</h3>
            <div className="text-3xl font-black text-amber-400">{userData?.stats?.top_artists_connected || 0}</div>
            <p className="text-gray-400 text-sm">From your music services</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">🏈 Favorite Teams</h3>
            <div className="text-3xl font-black text-amber-400">{userData?.stats?.favorite_teams || 0}</div>
            <p className="text-gray-400 text-sm">Across all leagues</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">⚡ Weekend Searches</h3>
            <div className="text-3xl font-black text-amber-400">{userData?.stats?.weekend_searches || 0}</div>
            <p className="text-gray-400 text-sm">Battles planned</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate('/weekend-finder')}
            className="bg-amber-400 text-gray-900 p-8 rounded-lg font-black text-2xl hover:bg-amber-300 transition-all shadow-xl border-2 border-gray-800 transform hover:scale-105"
          >
            🎯 FIND MY PERFECT WEEKENDS
          </button>
          <button
            onClick={() => alert('Coming soon: Connect Spotify/Apple Music, select favorite teams, customize your weekend preferences!')}
            className="bg-gray-800 text-gray-100 p-8 rounded-lg font-bold text-xl border-2 border-gray-700 hover:border-amber-400 hover:text-amber-400 transition-all"
          >
            ⚙️ Update My Battle Preferences
          </button>
        </div>

        {/* War Room Info */}
        <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Your War Room</h3>
          <div className="space-y-4">
            <div className="text-gray-300">
              📍 Battle Zone: <span className="text-amber-400 font-semibold">{userData?.location_city}, {userData?.location_state}</span>
            </div>
            <div className="text-gray-300">
              📅 Weekend Definition: <span className="text-amber-400 font-semibold">
                {userData?.weekend_days?.map(day => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(', ') || 'Fri, Sat, Sun'}
              </span>
            </div>
            <div className="text-gray-300">
              🔍 Search Radius: <span className="text-amber-400 font-semibold">{userData?.search_radius || 30} miles</span>
            </div>
            <div className="text-gray-300">
              🎵 Music Connected: <span className="text-amber-400 font-semibold">
                {userData?.stats?.top_artists_connected > 0 ? `${userData.stats.top_artists_connected} artists ready` : 'Connect your music service'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;