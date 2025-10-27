import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const StoryPlayer = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const config = { headers: { 'x-auth-token': user.token } };
        const { data } = await axios.get(`/api/stories/${id}`, config);
        setStory(data);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    if (user) {
      fetchStory();
    }
  }, [id, user]);

  if (!story) {
    return <div>Loading...</div>;
  }

  const paragraphs = story.storyText.split('\\n');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">{story.childId.name}'s Adventure</h1>

      <div className="aspect-video bg-black rounded-lg mb-8 shadow-lg">
        <video key={story.animationUrl} controls className="w-full h-full" src={story.animationUrl}>
           Your browser does not support the video tag.
        </video>
      </div>

      <div className="bg-card-bg p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Story</h2>
        {paragraphs.map((para, index) => (
          <motion.p
            key={index}
            className="text-text-sub leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
          >
            {para}
          </motion.p>
        ))}
      </div>

       <div className="bg-card-bg p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Moral of the Story</h2>
        <motion.p
            className="text-text-sub leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: paragraphs.length * 0.5 }}
        >
            {story.moral}
        </motion.p>
      </div>

      <div className="bg-card-bg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Narration</h2>
        <audio key={story.audioUrl} controls className="w-full" src={story.audioUrl}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default StoryPlayer;
