import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, Wind, Droplets, Search, ChevronDown, User, LogOut, SunDim, Sunset, LoaderCircle, Mail, Lock, AlertCircle } from 'lucide-react';

// --- Reusable UI Components ---

const HighlightCard = ({ title, value, unit, children }) => (
    <motion.div
        className="bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="text-gray-400 text-sm">{title}</h3>
        {children ? children :
            <p className="text-3xl font-bold mt-2">
                {value} <span className="text-xl font-normal">{unit}</span>
            </p>
        }
    </motion.div>
);

const InputField = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
        </span>
        <input {...props} className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
    </div>
);


// --- Authentication Component ---

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
        
        // Mock API call to bypass CORS issues
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

// --- Weather Dashboard Components ---

const Header = ({ onSearch, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            onSearch(searchInput.trim());
            setSearchInput('');
        }
    };

    return (
        <header className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search for a city..."
                    className="bg-[#1E213A]/80 backdrop-blur-sm border border-white/10 w-full pl-10 pr-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
            <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 bg-[#1E213A]/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                    <span className="text-white hidden sm:block">User Name</span>
                    <ChevronDown className="w-5 h-5 text-white" />
                </button>
                {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 mt-2 w-48 bg-[#1E213A]/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-10">
                        <button onClick={onLogout} className="w-full flex items-center px-4 py-2 text-white hover:bg-white/10"><LogOut className="w-5 h-5 mr-2" /> Logout</button>
                    </motion.div>
                )}
            </div>
        </header>
    );
};

const CurrentWeather = ({ data }) => {
    const { location, current, forecast } = data;
    const date = new Date(location.localtime);
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const todayForecast = forecast.forecastday[0].day;

    return (
        <div className="bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
                <p className="text-xl font-semibold text-white">{dayOfWeek}</p>
                <p className="text-gray-400 mb-4">{formattedDate}</p>
                <h1 className="text-7xl font-bold text-white my-2">{Math.round(current.temp_c)}°c</h1>
                <p className="text-gray-400">High: {Math.round(todayForecast.maxtemp_c)}° Low: {Math.round(todayForecast.mintemp_c)}°</p>
            </div>
            <div className="flex flex-col items-center mt-6 md:mt-0">
                <img src={current.condition.icon} alt={current.condition.text} className="w-32 h-32" />
                <p className="text-xl text-white mt-2">{current.condition.text}</p>
                <p className="text-gray-400">Feels Like {Math.round(current.feelslike_c)}°</p>
            </div>
        </div>
    );
};

const TodaysHighlights = ({ data }) => {
    const { current, forecast } = data;
    return (
        <div>
            <h2 className="text-xl text-white mb-4">Today's Highlight</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HighlightCard title="UV Index"><div className="w-24 h-24 mx-auto my-2 rounded-full border-[10px] border-yellow-400 flex items-center justify-center"><span className="text-3xl font-bold">{current.uv}</span></div></HighlightCard>
                <HighlightCard title="Chance of Rain" value={forecast.forecastday[0].day.daily_chance_of_rain} unit="%" />
                <HighlightCard title="Wind Status" value={current.wind_kph} unit="km/h" />
                <HighlightCard title="Humidity" value={current.humidity} unit="%" />
            </div>
        </div>
    );
};

const HourlyForecastCard = ({ hourData, isActive }) => {
    const date = new Date(hourData.time);
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    return (
        <div className={`flex flex-col items-center space-y-2 p-3 rounded-lg flex-shrink-0 w-24 ${isActive ? 'bg-blue-500/30' : 'bg-white/10 backdrop-blur-sm'}`}>
            <p className="text-sm">{time}</p>
            <img src={hourData.condition.icon} alt={hourData.condition.text} className="w-10 h-10" />
            <p className="font-bold">{Math.round(hourData.temp_c)}°</p>
        </div>
    );
};

const ForecastView = ({ data }) => {
    const todayAstro = data.forecast.forecastday[0].astro;
    const hourlyForecast = data.forecast.forecastday[0].hour;

    return (
        <div className="bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white mt-6">
            <h3 className="text-lg font-semibold mb-4">Today's Forecast</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {hourlyForecast.map((hour, index) => <HourlyForecastCard key={index} hourData={hour} isActive={index === 0} />)}
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg"><SunDim className="w-10 h-10 text-yellow-400" /><div><p className="text-gray-400">Sunrise</p><p className="font-bold text-lg">{todayAstro.sunrise}</p></div></div>
                <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg"><Sunset className="w-10 h-10 text-orange-400" /><div><p className="text-gray-400">Sunset</p><p className="font-bold text-lg">{todayAstro.sunset}</p></div></div>
            </div>
        </div>
    );
};

const DailyForecast = ({ data }) => (
    <div className="bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white mt-6">
        <h3 className="text-lg font-semibold mb-4">3-Day Forecast</h3>
        <div className="space-y-3">
            {data.forecast.forecastday.map((day) => {
                const date = new Date(day.date);
                const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                return (
                    <div key={day.date_epoch} className="flex justify-between items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                        <p className="font-semibold w-1/4">{dayOfWeek}</p>
                        <div className="flex items-center space-x-2 w-1/2 justify-center">
                            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8" />
                            <p className="text-sm text-gray-300">{day.day.condition.text}</p>
                        </div>
                        <p className="font-semibold text-right w-1/4">{Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°</p>
                    </div>
                );
            })}
        </div>
    </div>
);


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

// --- Main App Component ---

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const BackgroundBubbles = () => (
        <>
            <motion.div className="absolute top-10 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl" animate={{ y: [0, -20, 0, 20, 0], x: [0, 20, 0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}></motion.div>
            <motion.div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" animate={{ y: [0, 30, 0, -30, 0], x: [0, -30, 0, 30, 0] }} transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}></motion.div>
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
