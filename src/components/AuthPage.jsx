import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Mail, Lock, AlertCircle, User, LoaderCircle, CheckCircle } from 'lucide-react';

const AuthPage = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(''); 
        setLoading(true);

       
        if (!isLoginView && !name) {
            setError("Please enter your name.");
            setLoading(false);
            return;
        }
        if (!email) {
            setError("Please enter your email.");
            setLoading(false);
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            setLoading(false);
            return;
        }
        if (password.length < 6) {
             setError("Password must be at least 6 characters long.");
             setLoading(false);
            return;
        }

        
        const endpoint = isLoginView 
            ? 'https://smart-pashu.vercel.app/api/auth/login' 
            : 'https://smart-pashu.vercel.app/api/auth/signup';
            
        const payload = isLoginView
            ? { email, password }
            : { name, email, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'An error occurred.');
            }
            
            
            // Check if user was logging in or signing up
            if (isLoginView) {
                // Login was successful, go to dashboard
                onLoginSuccess();
            } else {
                // Signup was successful, show message and switch to login view
                setSuccess('Account created successfully! Please log in.');
                setIsLoginView(true); // Switch to login form
                // Clear fields
                setName('');
                setEmail('');
                setPassword('');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        
        
       
        /*
        if (isLoginView) {
            console.log("Simulating login for:", email);
        } else {
            console.log("Simulating signup for:", name, email);
        }
        
        setTimeout(() => {
            onLoginSuccess();
        }, 1000);
        */
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
        setSuccess(''); // Clear success message on toggle
        setName('');
        setEmail('');
        setPassword('');
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
            <form onSubmit={handleSubmit} className="space-y-6">
                {!isLoginView && (
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                )}
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
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

               
                {success && (
                    <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 p-3 rounded-lg">
                        <CheckCircle size={20} />
                        <span>{success}</span>
                    </div>
                )}

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={loading} // Button ko loading ke waqt disable karein
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
                >
                    {loading ? (
                        <LoaderCircle className="animate-spin" /> 
                    ) : (
                        isLoginView ? 'Login' : 'Sign Up'
                    )}
                </motion.button>
            </form>
            <p className="text-center text-gray-400 mt-6">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}
                <button onClick={toggleView} className="font-semibold text-purple-400 hover:underline ml-2">
                    {isLoginView ? 'Sign Up' : 'Log In'}
                </button>
            </p>
        </motion.div>
    );
};

export default AuthPage;