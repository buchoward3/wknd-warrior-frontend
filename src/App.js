// WKND Warrior Main App - Conquer Your Weekend! 🪖
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import WeekendFinder from './pages/WeekendFinder';
import OnboardingPage from './pages/OnboardingPage';

// Protected Route Wrapper
const ProtectedRouteWrapper = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Wrapper (redirect to dashboard if logged in)
const PublicRouteWrapper = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-amber-400 animate-pulse">Loading...</div>
    </div>;
  }
  
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicRouteWrapper>
                  <LandingPage />
                </PublicRouteWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRouteWrapper>
                  <LoginPage />
                </PublicRouteWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRouteWrapper>
                  <RegisterPage />
                </PublicRouteWrapper>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteWrapper>
                  <Dashboard />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/weekend-finder"
              element={
                <ProtectedRouteWrapper>
                  <WeekendFinder />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/onboarding"
              element={
                <ProtectedRouteWrapper>
                  <OnboardingPage />
                </ProtectedRouteWrapper>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;