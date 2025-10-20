import React from 'react';
import { motion } from 'framer-motion';

const DailyForecast = ({ data }) => (
    <div className="bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white mt-6">
        <h3 className="text-lg font-semibold mb-4">3-Day Forecast</h3>
        <div className="space-y-3">
            {data.forecast.forecastday.map((day) => {
                const date = new Date(day.date);
                const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
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

export default DailyForecast;

