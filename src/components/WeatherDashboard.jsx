import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, Wind, Droplets, Search, LogOut, LoaderCircle } from 'lucide-react';

const WeatherDashboard = ({ onLogout }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Ghaziabad');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      const API_KEY = '30aa08af5a9e41a1ae2114054251606';
      const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('City not found. Please try again.');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) setCity(searchInput.trim());
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <LoaderCircle className="w-16 h-16 animate-spin text-purple-500" />
        <p className="mt-4 text-xl">Fetching Weather Data...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto p-4 sm:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="flex flex-wrap justify-between items-center mb-6 gap-4">
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
          onClick={onLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </motion.header>

      {error && (
        <motion.div variants={itemVariants} className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center mb-6">
          {error}
        </motion.div>
      )}

      {/* Weather Data */}
      {weatherData && (
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather */}
          <motion.section
            variants={itemVariants}
            className="lg:col-span-3 bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center"
          >
            <div>
              <h1 className="text-4xl font-bold">{weatherData.location.name}, {weatherData.location.country}</h1>
              <p className="text-gray-400">{new Date(weatherData.location.localtime).toLocaleString()}</p>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <motion.img 
                src={weatherData.current.condition.icon} 
                alt={weatherData.current.condition.text} 
                className="w-24 h-24"
                whileHover={{ rotate: 15, scale: 1.1 }}
              />
              <div className="ml-4 text-center sm:text-left">
                <p className="text-6xl font-bold">{Math.round(weatherData.current.temp_c)}°c</p>
                <p className="text-gray-300">{weatherData.current.condition.text}</p>
              </div>
            </div>
          </motion.section>

          {/* Highlights */}
          <motion.section variants={itemVariants} className="lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">Today's Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Highlight title="Wind Status" icon={<Wind />} value={`${weatherData.current.wind_kph} km/h`} />
              <Highlight title="Humidity" icon={<Droplets />} value={`${weatherData.current.humidity}%`} />
              <Highlight title="UV Index" icon={<Sun />} value={weatherData.current.uv} />
              <Highlight title="Feels Like" icon={<Cloud />} value={`${Math.round(weatherData.current.feelslike_c)}°c`} />
            </div>
          </motion.section>

          {/* Forecast */}
          <Forecast weatherData={weatherData} />
        </main>
      )}
    </motion.div>
  );
};

const Highlight = ({ title, icon, value }) => (
  <motion.div whileHover={{ scale: 1.05, y: -5 }} className="bg-[#1E213A]/60 p-4 rounded-xl flex flex-col items-center">
    <div className="text-gray-400 mb-2">{icon}</div>
    <h3 className="text-gray-400">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </motion.div>
);

const Forecast = ({ weatherData }) => (
  <>
    {/* Hourly Forecast */}
    <motion.section className="lg:col-span-2 bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Today's Forecast</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {weatherData.forecast.forecastday[0].hour.map(hour => (
          <motion.div
            key={hour.time_epoch}
            className="flex flex-col items-center space-y-2 p-3 rounded-lg shrink-0 w-24 bg-white/10"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <p className="text-sm">{new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}</p>
            <img src={hour.condition.icon} alt={hour.condition.text} className="w-10 h-10" />
            <p className="font-bold">{Math.round(hour.temp_c)}°</p>
          </motion.div>
        ))}
      </div>
    </motion.section>

    {/* 3-Day Forecast */}
    <motion.section className="lg:col-span-1 bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">3-Day Forecast</h2>
      <div className="space-y-3">
        {weatherData.forecast.forecastday.map(day => (
          <motion.div
            key={day.date_epoch}
            className="flex justify-between items-center bg-white/10 p-3 rounded-lg"
            whileHover={{ scale: 1.03 }}
          >
            <p className="font-semibold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8" />
            <p className="font-semibold">{Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  </>
);

export default WeatherDashboard;
