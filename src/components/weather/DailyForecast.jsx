import React from 'react';
import { motion } from 'framer-motion';

const DailyForecast = ({ forecastDays }) => {
  if (!forecastDays || forecastDays.length === 0) return null;

  return (
    <motion.section className="lg:col-span-1 bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">{forecastDays.length}-Day Forecast</h2>
      <div className="space-y-3">
        {forecastDays.map((day) => (
          <motion.div
            key={day.date_epoch}
            className="flex justify-between items-center bg-white/10 p-3 rounded-lg"
            whileHover={{ scale: 1.03 }}
          >
            <p className="font-semibold">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-8 h-8"
            />
            <p className="font-semibold">
              {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default DailyForecast;
