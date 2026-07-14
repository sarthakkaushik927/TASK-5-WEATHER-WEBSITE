import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, LoaderCircle } from 'lucide-react';
import InputField from '../ui/InputField';
import ErrorAlert from '../ui/ErrorAlert';
import SuccessAlert from '../ui/SuccessAlert';

const SignupForm = ({ onSignupSuccess }) => {
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

    if (!name) {
      setError('Please enter your name.');
      setLoading(false);
      return;
    }
    if (!email) {
      setError('Please enter your email.');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      await onSignupSuccess({ name, email, password });
      setSuccess('Account created successfully! Please log in.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        icon={User}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <InputField
        icon={Mail}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <InputField
        icon={Lock}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <ErrorAlert message={error} />
      <SuccessAlert message={success} />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-50 cursor-pointer"
      >
        {loading ? <LoaderCircle className="animate-spin" /> : 'Sign Up'}
      </motion.button>
    </form>
  );
};

export default SignupForm;
