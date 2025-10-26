import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mic, Video } from 'lucide-react';

const StoryCard = ({ storyText }) => {
  return (
    <motion.div
      className="bg-card-bg p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-text-sub leading-relaxed mb-6">{storyText}</p>
      <div className="flex justify-center space-x-4">
        <button className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all flex items-center space-x-2">
          <Mic size={16} />
          <span>Read Aloud</span>
        </button>
        <button className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all flex items-center space-x-2">
          <Video size={16} />
          <span>Generate Video</span>
        </button>
        <button className="bg-transparent border border-primary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-dark-bg transition-all flex items-center space-x-2">
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>
    </motion.div>
  );
};

export default StoryCard;
