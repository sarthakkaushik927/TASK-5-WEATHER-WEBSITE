import React from 'react';
import { motion } from 'framer-motion';

const HourlyForecast = ({ hours }) => {
  if (!hours || hours.length === 0) return null;

  return (
    <motion.section className="lg:col-span-2 bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Today's Forecast</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {hours.map((hour) => (
          <motion.div
            key={hour.time_epoch}
            className="flex flex-col items-center space-y-2 p-3 rounded-lg shrink-0 w-24 bg-white/10"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <p className="text-sm">
              {new Date(hour.time).toLocaleTimeString('en-US', {
                hour: 'numeric',
                hour12: true,
              })}
            </p>
            <img
              src={hour.condition.icon}
              alt={hour.condition.text}
              className="w-10 h-10"
            />
            <p className="font-bold">{Math.round(hour.temp_c)}°</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HourlyForecast;
