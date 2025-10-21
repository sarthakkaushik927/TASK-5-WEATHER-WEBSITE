import React from 'react';
import { motion } from 'motion/react';

export const HighlightCard = ({ title, value, unit, children }) => (
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
