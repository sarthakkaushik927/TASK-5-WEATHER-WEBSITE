import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, Wind, Droplets } from 'lucide-react';
import HighlightCard from './HighlightCard';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Highlights = ({ current }) => {
  if (!current) return null;

  const highlights = [
    { title: 'Wind Status', icon: <Wind />, value: `${current.wind_kph} km/h` },
    { title: 'Humidity', icon: <Droplets />, value: `${current.humidity}%` },
    { title: 'UV Index', icon: <Sun />, value: current.uv },
    { title: 'Feels Like', icon: <Cloud />, value: `${Math.round(current.feelslike_c)}°c` },
  ];

  return (
    <motion.section variants={itemVariants} className="lg:col-span-3">
      <h2 className="text-2xl font-semibold mb-4">Today's Highlights</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((item) => (
          <HighlightCard key={item.title} {...item} />
        ))}
      </div>
    </motion.section>
  );
};

export default Highlights;
