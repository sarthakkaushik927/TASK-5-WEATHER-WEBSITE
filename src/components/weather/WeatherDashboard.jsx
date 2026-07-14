import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, LogOut } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useWeather } from '../../hooks/useWeather';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorAlert from '../ui/ErrorAlert';
import CurrentWeather from './CurrentWeather';
import Highlights from './Highlights';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const WeatherDashboard = () => {
  const { logout } = useAuthContext();
  const { weatherData, loading, error, setCity } = useWeather();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Fetching Weather Data..." />;
  }

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto p-4 sm:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        variants={itemVariants}
        className="flex flex-wrap justify-between items-center mb-6 gap-4"
      >
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className="bg-[#1E213A]/80 backdrop-blur-sm border border-white/10 w-full pl-10 pr-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </motion.header>

      {error && (
        <motion.div variants={itemVariants} className="mb-6">
          <ErrorAlert message={error} />
        </motion.div>
      )}

      {weatherData && (
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CurrentWeather
            location={weatherData.location}
            current={weatherData.current}
          />
          <Highlights current={weatherData.current} />
          <HourlyForecast
            hours={weatherData.forecast?.forecastday?.[0]?.hour}
          />
          <DailyForecast
            forecastDays={weatherData.forecast?.forecastday}
          />
        </main>
      )}
    </motion.div>
  );
};

export default WeatherDashboard;
