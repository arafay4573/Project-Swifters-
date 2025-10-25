import React from 'react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <motion.div
      className="bg-card-bg p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {videoUrl ? (
        <video src={videoUrl} controls className="w-full rounded-lg"></video>
      ) : (
        <div className="text-center">
          <p className="text-text-sub mb-4">Your video is being generated...</p>
          <div className="w-full bg-dark-bg rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;
