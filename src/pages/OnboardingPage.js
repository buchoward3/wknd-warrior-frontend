// WKND Warrior Onboarding/Preferences - Connect Your Battle Gear! ⚙️
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WkndLogo from '../components/WkndLogo';
import BackendStatus from '../components/BackendStatus';

const OnboardingPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [currentFavorites, setCurrentFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    loadTeams();
    loadCurrentFavorites();
  }, []);

  const loadTeams = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sports/teams', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/user/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Current user data:', data);
      
      // Extract team IDs from favorite_teams array
      const favoriteTeamIds = data.favorite_teams?.map(team => team.team_id) || [];
      setCurrentFavorites(favoriteTeamIds);
      setSelectedTeams(favoriteTeamIds);
      
      console.log('Current favorite team IDs:', favoriteTeamIds);
    } catch (error) {
      console.error('Error loading current favorites:', error);
    }
  };

  const handleTeamToggle = (teamId) => {
    setSelectedTeams(prev => {
      const isCurrentlySelected = prev.includes(teamId);
      if (isCurrentlySelected) {
        return prev.filter(id => id !== teamId);
      } else {
        return [...prev, teamId];
      }
    });
  };

  const clearAllTeams = async () => {
    if (!window.confirm('🗑️ Clear ALL favorite teams? This cannot be undone!')) {
      return;
    }

    setClearing(true);
    try {
      const response = await fetch('http://localhost:3001/api/user/clear-teams', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('✅ All teams cleared! Now select your favorites.');
        setSelectedTeams([]);
        setCurrentFavorites([]);
      } else {
        alert('❌ Error clearing teams. Check console for details.');
      }
    } catch (error) {
      console.error('Error clearing teams:', error);
      alert('❌ Network error clearing teams.');
    } finally {
      setClearing(false);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    
    try {
      // First clear existing teams
      await fetch('http://localhost:3001/api/user/clear-teams', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Then add selected teams
      for (const teamId of selectedTeams) {
        const response = await fetch('http://localhost:3001/api/user/favorite-teams', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ teamId }),
        });

        if (!response.ok) {
          console.error('Failed to save team:', teamId);
        }
      }
      
      alert(`🎯 Battle preferences saved! You selected ${selectedTeams.length} teams. Now you can find perfect weekends!`);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('❌ Error saving preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const connectSpotify = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/spotify/auth-url', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      console.log('Spotify auth URL:', data);
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('Error connecting Spotify:', error);
      alert('❌ Error connecting to Spotify. Please try again.');
    }
  };

  const testWeekendFinder = async () => {
    try {
      console.log('🔍 Testing weekend finder...');
      const response = await fetch('http://localhost:3001/api/user/weekend-events?date=2025-07-28', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('Weekend finder result:', data);
      
      if (response.ok) {
        alert(`✅ Weekend finder test successful! Found ${data.matched_events?.length || 0} events. Check console for details.`);
      } else {
        alert(`❌ Weekend finder error: ${data.error}`);
      }
    } catch (error) {
      console.error('Weekend finder test error:', error);
      alert('❌ Network error testing weekend finder.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <WkndLogo size="large" className="mx-auto mb-4 animate-pulse" />
          <div className="text-amber-400 font-semibold">Loading battle gear...</div>
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
              <div className="text-lg font-black">BATTLE PREFERENCES</div>
              <div className="text-xs text-amber-400">GEAR UP FOR WAR</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <BackendStatus />
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gray-700 text-gray-100 font-semibold rounded border-2 border-gray-600 hover:border-amber-400 transition-colors"
            >
              ← Back to Command Center
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-100 mb-4">Gear Up, Warrior</h1>
          <p className="text-xl text-amber-400">Connect your music and select your teams to find perfect weekends</p>
          <p className="text-gray-400 mt-2">Currently have {currentFavorites.length} favorite teams</p>
        </div>

        {/* Debug Section */}
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-700 mb-6">
          <h3 className="text-lg font-bold text-gray-100 mb-2">🔧 Debug Tools</h3>
          <div className="flex space-x-4">
            <button
              onClick={testWeekendFinder}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500"
            >
              🧪 Test Weekend Finder
            </button>
            <button
              onClick={clearAllTeams}
              disabled={clearing}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500 disabled:opacity-50"
            >
              {clearing ? 'Clearing...' : '🗑️ Clear All Teams'}
            </button>
          </div>
        </div>

        {/* Music Services */}
        <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">🎵 Connect Your Music</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={connectSpotify}
              className="p-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all border-2 border-gray-800"
            >
              🎵 Connect Spotify
            </button>
            <button
              onClick={() => alert('🍎 Apple Music connection coming soon!')}
              className="p-4 bg-gray-600 text-gray-300 font-bold rounded-lg hover:bg-gray-500 transition-all border-2 border-gray-600"
            >
              🍎 Connect Apple Music (Soon)
            </button>
          </div>
        </div>

        {/* Favorite Teams */}
        <div className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">🏈 Select Your Favorite Teams</h2>
          <p className="text-gray-400 mb-6">Choose teams you want to follow across all leagues</p>

          {teams.map((league) => (
            <div key={league.league} className="mb-6">
              <h3 className="text-xl font-bold text-amber-400 mb-3">{league.league_full_name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {league.teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleTeamToggle(team.id)}
                    className={`p-3 rounded-lg border-2 transition-all font-semibold ${
                      selectedTeams.includes(team.id)
                        ? 'bg-amber-400 text-gray-900 border-amber-400'
                        : 'bg-gray-700 text-gray-100 border-gray-600 hover:border-amber-400'
                    }`}
                  >
                    <div className="text-sm">{team.city}</div>
                    <div className="text-xs">{team.name}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={savePreferences}
            disabled={saving}
            className="px-8 py-4 bg-amber-400 text-gray-900 font-black text-xl rounded-lg hover:bg-amber-300 transition-all shadow-xl border-2 border-gray-800 disabled:opacity-50"
          >
            {saving ? 'Saving Battle Gear...' : `🎯 SAVE ${selectedTeams.length} TEAMS & TEST WEEKEND FINDER`}
          </button>
        </div>

        {selectedTeams.length === 0 && (
          <div className="text-center bg-gray-700 p-6 rounded-lg border border-gray-600 mt-6">
            <p className="text-gray-300">👆 Select at least one team to test the weekend finder!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;