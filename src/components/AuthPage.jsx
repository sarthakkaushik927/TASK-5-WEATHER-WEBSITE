import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const AuthPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    console.log("Simulating login...");
    onLoginSuccess();
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-[#1E213A]/60 backdrop-blur-lg border border-white/10 p-8 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back!</h2>
      <p className="text-center text-gray-400 mb-8">Log in to view the weather</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors duration-300"
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AuthPage;
