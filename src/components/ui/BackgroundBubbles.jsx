import React from 'react';
import { motion } from 'framer-motion';

const BackgroundBubbles = () => (
  <>
    <motion.div 
      className="absolute top-10 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"
      animate={{ y: [0, -20, 0, 20, 0], x: [0, 20, 0, -20, 0] }}
      transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
    <motion.div 
      className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"
      animate={{ y: [0, 30, 0, -30, 0], x: [0, -30, 0, 30, 0] }}
      transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  </>
);

export default BackgroundBubbles;
