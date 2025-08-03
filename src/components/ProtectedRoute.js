// Protected Route Component - Keeps warriors secure 🛡️
import React from 'react';
import { useAuth } from '../context/AuthContext';
import WkndLogo from './WkndLogo';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <WkndLogo size="large" className="mx-auto mb-4 animate-pulse" />
          <div className="text-amber-400 font-semibold">Loading your battle station...</div>
        </div>
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;