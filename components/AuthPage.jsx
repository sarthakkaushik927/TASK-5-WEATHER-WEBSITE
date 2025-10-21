import React, { useState } from 'react';
import { User, Mail, Lock, AlertCircle, LoaderCircle } from 'lucide-react';
import { InputField } from './components/ui/InputField.jsx';

const AuthPage = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (!isLoginView && !formData.name) {
            setError('Name is required for signup.');
            return;
        }

        setLoading(true);

        // --- MOCK API CALL ---
        setTimeout(() => {
            console.log("Simulating successful login/signup for:", formData.email);
            onLoginSuccess();
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-[#1E213A]/60 backdrop-blur-lg border border-white/10 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-2">{isLoginView ? 'Welcome Back!' : 'Create Account'}</h2>
            <p className="text-center text-gray-400 mb-8">{isLoginView ? 'Log in to view the weather' : 'Sign up to get started'}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                {!isLoginView && (
                    <InputField
                        icon={<User className="text-gray-400" />}
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                )}
                <InputField
                    icon={<Mail className="text-gray-400" />}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    icon={<Lock className="text-gray-400" />}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                 {error && (
                    <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}
                <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 disabled:bg-purple-800 disabled:cursor-not-allowed flex items-center justify-center">
                    {loading ? <LoaderCircle className="animate-spin" /> : (isLoginView ? 'Login' : 'Sign Up')}
                </button>
            </form>
            <p className="text-center text-gray-400 mt-6">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-semibold text-purple-400 hover:underline ml-2">
                    {isLoginView ? 'Sign Up' : 'Log In'}
                </button>
            </p>
        </div>
    );
};

export default AuthPage;

