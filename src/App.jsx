import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthPage from './components/AuthPage';
import WeatherDashboard from './components/WeatherDashboard';
import BackgroundBubbles from './components/BackgroundBubbles';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-linear-to-br from-gray-900 via-purple-900 to-gray-800 min-h-screen text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <BackgroundBubbles />
      
      <AnimatePresence mode="wait">
        {isLoggedIn ? (
          <WeatherDashboard key="dashboard" onLogout={() => setIsLoggedIn(false)} />
        ) : (
          <AuthPage key="login" onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </AnimatePresence>
    </div>
  );
}
