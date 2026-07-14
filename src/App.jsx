import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import WeatherDashboard from './components/weather/WeatherDashboard';
import BackgroundBubbles from './components/ui/BackgroundBubbles';
import LoadingSpinner from './components/ui/LoadingSpinner';

export default function App() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="bg-linear-to-br from-gray-900 via-purple-900 to-gray-800 min-h-screen text-white flex items-center justify-center">
        <LoadingSpinner message="Initializing..." />
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-gray-900 via-purple-900 to-gray-800 min-h-screen text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <BackgroundBubbles />
      <AnimatePresence mode="wait">
        {isAuthenticated ? (
          <WeatherDashboard key="dashboard" />
        ) : (
          <AuthPage key="auth" />
        )}
      </AnimatePresence>
    </div>
  );
}
