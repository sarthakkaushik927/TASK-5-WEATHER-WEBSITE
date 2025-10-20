import React from 'react';

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

export default CurrentWeather;
