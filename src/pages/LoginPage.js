// WKND Warrior Login Page - Welcome back, warrior! 🪖
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WkndLogo from '../components/WkndLogo';
import BackendStatus from '../components/BackendStatus';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <WkndLogo size="large" className="mx-auto mb-4" />
          <h1 className="text-3xl font-black text-gray-100 mb-2">Welcome Back, Warrior</h1>
          <p className="text-amber-400 font-semibold">Ready to conquer another weekend?</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border-2 border-gray-700 shadow-xl">
          {error && (
            <div className="bg-red-900 border border-red-600 text-red-100 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-300 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-100 focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-100 focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-400 text-gray-900 font-black rounded-lg hover:bg-amber-300 transition-all shadow-lg border-2 border-gray-800 disabled:opacity-50"
          >
            {loading ? 'Connecting to Backend...' : 'ENTER THE BATTLEFIELD'}
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-400">New warrior? </span>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              Join the ranks
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <BackendStatus />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;