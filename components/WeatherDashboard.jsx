import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LoaderCircle } from 'lucide-react';

import Header from './components/Header.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import TodaysHighlights from './components/TodaysHighlights.jsx';
import ForecastView from './components/ForecastView.jsx';
import DailyForecast from './components/DailyForecast.jsx';

const WeatherDashboard = ({ onLogout }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Ghaziabad');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            const API_KEY = '30aa08af5a9e41a1ae2114054251606';
            const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error.message || 'City not found');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
                setWeatherData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchWeatherData();
    }, [city]);

    const handleSearch = (searchedCity) => setCity(searchedCity);

    if (loading) {
        return <div className="flex flex-col items-center justify-center h-full w-full"><LoaderCircle className="w-16 h-16 animate-spin text-purple-500" /><p className="mt-4 text-xl">Fetching Weather Data...</p></div>;
    }
    
    return (
        <main className="flex-grow p-6 overflow-auto z-10 w-full">
            <Header onSearch={handleSearch} onLogout={onLogout} />
            {error && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center"><p className="font-bold">Error</p><p>{error}</p></div>
            )}
            {weatherData && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-3"><CurrentWeather data={weatherData} /></motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-3"><TodaysHighlights data={weatherData} /></motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2"><ForecastView data={weatherData} /></motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="lg:col-span-1"><DailyForecast data={weatherData} /></motion.div>
                </motion.div>
            )}
        </main>
    );
};

export default WeatherDashboard;

