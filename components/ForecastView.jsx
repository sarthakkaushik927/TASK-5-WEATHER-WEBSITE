import React from 'react';
import { SunDim, Sunset } from 'lucide-react';

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

export default ForecastView;