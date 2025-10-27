import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { RefreshCw, Play } from 'lucide-react';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': user.token,
          },
        };
        const [storiesRes, profilesRes] = await Promise.all([
          axios.get('/api/stories', config),
          axios.get('/api/profiles', config),
        ]);
        setStories(storiesRes.data);
        setProfiles(profilesRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleGenerateStory = async (childId) => {
    try {
      const config = {
        headers: {
          'x-auth-token': user.token,
        },
      };
      await axios.post('/api/stories/generate', { childId }, config);
      setShowModal(false);
      // Refresh stories
      const { data } = await axios.get('/api/stories', config);
      setStories(data);
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Your Stories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-dark-bg py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
        >
          Generate New Story
        </button>
      </div>

      {stories.length === 0 ? (
        <p className="text-text-sub">You don't have any stories yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story._id} className="bg-card-bg p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{story.childId.name}'s Story</h2>
              <p className="text-text-sub text-sm mb-4">
                {new Date(story.createdAt).toLocaleDateString()}
              </p>
              <p className="text-text-sub mb-4 truncate">{story.storyText}</p>
              <div className="flex justify-end gap-4">
                <button className="text-primary hover:underline flex items-center space-x-2">
                  <RefreshCw size={16} />
                  <span>Regenerate</span>
                </button>
                <Link to={`/story/${story._id}`} className="text-green-400 hover:underline flex items-center space-x-2">
                  <Play size={16} />
                  <span>Play</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card-bg p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Select a Profile</h2>
            {profiles.length > 0 ? (
              <ul>
                {profiles.map(profile => (
                  <li key={profile._id} className="mb-2">
                    <button
                      onClick={() => handleGenerateStory(profile._id)}
                      className="w-full text-left p-2 rounded hover:bg-dark-bg"
                    >
                      {profile.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No child profiles found. Please create one first.</p>
            )}
            <button onClick={() => setShowModal(false)} className="mt-4 text-red-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
