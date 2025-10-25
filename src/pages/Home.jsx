import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="text-center py-16">
      <motion.div
        className="inline-block"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <Sparkles className="text-accent" size={64} />
      </motion.div>
      <motion.h1
        className="text-5xl font-bold text-primary mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Project Swifters
      </motion.h1>
      <motion.p
        className="text-lg text-text-sub mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Turn your child's imagination into a magical, animated story. Just provide a few details, and our AI will create a personalized video with narration and visuals.
      </motion.p>
      <Link to="/story-form">
        <motion.button
          className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all shadow-glow-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Your Magical Story
        </motion.button>
      </Link>
    </div>
  );
};

export default Home;
