import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuthContext } from '../../context/AuthContext';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login, signup } = useAuthContext();

  const handleLogin = async (credentials) => {
    await login(credentials);
  };

  const handleSignup = async (userData) => {
    await signup(userData);
    setIsLoginView(true);
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-[#1E213A]/60 backdrop-blur-lg border border-white/10 p-8 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-white mb-2">
        {isLoginView ? 'Welcome Back!' : 'Create Account'}
      </h2>
      <p className="text-center text-gray-400 mb-8">
        {isLoginView ? 'Log in to view the weather' : 'Sign up to get started'}
      </p>

      {isLoginView ? (
        <LoginForm onLoginSuccess={handleLogin} />
      ) : (
        <SignupForm onSignupSuccess={handleSignup} />
      )}

      <p className="text-center text-gray-400 mt-6">
        {isLoginView ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={toggleView}
          className="font-semibold text-purple-400 hover:underline ml-2 cursor-pointer"
        >
          {isLoginView ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </motion.div>
  );
};

export default AuthPage;
