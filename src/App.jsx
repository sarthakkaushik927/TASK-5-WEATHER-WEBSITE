import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherDashboard from './WeatherDashboard.jsx';
import AuthPage from './AuthPage.jsx';


// --- Main App Component ---

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Animated Background Bubbles Component
    const BackgroundBubbles = () => (
        <>
            <motion.div className="absolute top-10 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl" animate={{ y: [0, -20, 0, 20, 0], x: [0, 20, 0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
            <motion.div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" animate={{ y: [0, 30, 0, -30, 0], x: [0, -30, 0, 30, 0] }} transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
        </>
    );

    return (
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 min-h-screen flex items-center justify-center text-white font-sans relative overflow-hidden">
            <BackgroundBubbles />
            <AnimatePresence mode="wait">
                <motion.div
                    key={isLoggedIn ? 'dashboard' : 'login'}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="z-10 w-full h-full flex items-center justify-center"
                >
                    {isLoggedIn ? (
                        <WeatherDashboard onLogout={() => setIsLoggedIn(false)} />
                    ) : (
                        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}