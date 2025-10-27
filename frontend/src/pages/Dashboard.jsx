import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': user.token,
          },
        };
        const { data } = await axios.get('/api/stories', config);
        setStories(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchStories();
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Your Stories</h1>
      {stories.length === 0 ? (
        <p className="text-text-sub">You don't have any stories yet. <Link to="/story-form" className="text-primary hover:underline">Create one now!</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story._id} className="bg-card-bg p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{story.childId.name}'s Story</h2>
              <p className="text-text-sub text-sm mb-4">
                {new Date(story.createdAt).toLocaleDateString()}
              </p>
              <p className="text-text-sub mb-4 truncate">{story.storyText}</p>
              <div className="flex justify-end">
                <button className="text-primary hover:underline flex items-center space-x-2">
                  <RefreshCw size={16} />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
