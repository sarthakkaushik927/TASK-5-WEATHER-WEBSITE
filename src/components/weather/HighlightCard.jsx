import React from 'react';
import { motion } from 'framer-motion';

const HighlightCard = ({ title, icon, value }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-[#1E213A]/60 p-4 rounded-xl flex flex-col items-center"
  >
    <div className="text-gray-400 mb-2">{icon}</div>
    <h3 className="text-gray-400">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </motion.div>
);

export default HighlightCard;
