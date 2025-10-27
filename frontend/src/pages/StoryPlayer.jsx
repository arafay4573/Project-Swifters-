import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const StoryPlayer = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': user.token,
          },
        };
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">{story.childId.name}'s Adventure</h1>

      <div className="aspect-video bg-black rounded-lg mb-8">
        {/* Placeholder for animation/video */}
        <video key={story.animationUrl} controls className="w-full h-full" src={story.animationUrl}>
           Your browser does not support the video tag.
        </video>
      </div>

      <div className="bg-card-bg p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Story Text</h2>
        <p className="text-text-sub leading-relaxed">{story.storyText}</p>
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
