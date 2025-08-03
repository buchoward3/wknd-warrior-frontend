// WKND Warrior Registration Page - Join the ranks! ⚡
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WkndLogo from '../components/WkndLogo';
import BackendStatus from '../components/BackendStatus';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    location_city: 'Austin',
    location_state: 'TX'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <WkndLogo size="large" className="mx-auto mb-4" />
          <h1 className="text-3xl font-black text-gray-100 mb-2">Join the Warriors</h1>
          <p className="text-amber-400 font-semibold">Your perfect weekends await</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border-2 border-gray-700 shadow-xl">
          {error && (
            <div className="bg-red-900 border border-red-600 text-red-100 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-100 focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-100 focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-100 focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-300 font-bold mb-2">City</label>
              <input
                type="text"
                name="location_city"
                value={formData.location_city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-100 focus:border-amber-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">State</label>
              <input
                type="text"
                name="location_state"
                value={formData.location_state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-100 focus:border-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-400 text-gray-900 font-black rounded-lg hover:bg-amber-300 transition-all shadow-lg border-2 border-gray-800 disabled:opacity-50"
          >
            {loading ? 'Creating Warrior Account...' : 'JOIN THE WARRIORS'}
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-400">Already a warrior? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              Login here
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

export default RegisterPage;