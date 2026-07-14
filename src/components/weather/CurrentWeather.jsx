import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const CurrentWeather = ({ location, current }) => {
  if (!location || !current) return null;

  return (
    <motion.section
      variants={itemVariants}
      className="lg:col-span-3 bg-[#1E213A]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center"
    >
      <div>
        <h1 className="text-4xl font-bold">
          {location.name}, {location.country}
        </h1>
        <p className="text-gray-400">
          {new Date(location.localtime).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <motion.img
          src={current.condition.icon}
          alt={current.condition.text}
          className="w-24 h-24"
          whileHover={{ rotate: 15, scale: 1.1 }}
        />
        <div className="ml-4 text-center sm:text-left">
          <p className="text-6xl font-bold">{Math.round(current.temp_c)}°c</p>
          <p className="text-gray-300">{current.condition.text}</p>
        </div>
      </div>
    </motion.section>
  );
};

export default CurrentWeather;
