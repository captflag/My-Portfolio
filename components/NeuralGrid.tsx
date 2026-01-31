
import React from 'react';
import { motion } from 'framer-motion';

const NeuralGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 neural-grid opacity-20"></div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent h-1/2 w-full"
        animate={{
          top: ['-50%', '100%']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#280b0b_90%)]"></div>
    </div>
  );
};

export default NeuralGrid;
