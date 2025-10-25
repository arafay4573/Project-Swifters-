import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="text-primary" size={48} />
      </motion.div>
    </div>
  );
};

export default Loader;
