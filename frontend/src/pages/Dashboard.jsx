import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Clock, Settings, Play } from 'lucide-react';

const ProgressBar = ({ value, max, label, icon }) => (
    <div>
        <div className="flex items-center justify-between mb-1">
            <span className="flex items-center text-sm font-medium text-text-sub">
                {icon}
                <span className="ml-2">{label}</span>
            </span>
            <span className="text-sm font-bold text-primary">{`${value} / ${max}`}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(value / max) * 100}%` }}></div>
        </div>
    </div>
);

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    if (!user) return;
    try {
      const config = { headers: { 'x-auth-token': user.token } };
      const [storiesRes, profilesRes, analyticsRes] = await Promise.all([
        axios.get('/api/stories', config),
        axios.get('/api/profiles', config),
        axios.get('/api/analytics/summary', config)
      ]);
      setStories(storiesRes.data);
      setProfiles(profilesRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleGenerateStory = async (childId) => {
    try {
      const config = { headers: { 'x-auth-token': user.token } };
      await axios.post('/api/stories/generate', { childId }, config);
      setShowStoryModal(false);
      fetchData(); // Refresh both stories and profiles
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  const handleFacelessModeToggle = async (profile) => {
    try {
      const config = { headers: { 'x-auth-token': user.token } };
      const updatedProfile = { ...profile, facelessMode: !profile.facelessMode };
      await axios.put(`/api/profiles/${profile._id}`, updatedProfile, config);
      fetchData(); // Refresh data to show updated state
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      {/* Analytics Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-6">Child Progress</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {analytics.map(child => (
            <div key={child.childId} className="bg-card-bg p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-accent mb-4">{child.name}</h2>
              <div className="space-y-4">
                <ProgressBar value={child.totalStoriesRead} max={50} label="Stories Read" icon={<BookOpen size={16} />} />
                <ProgressBar value={child.averageQuizScore} max={10} label="Avg. Quiz Score" icon={<Target size={16} />} />
                <ProgressBar value={child.totalScreenTime} max={120} label="Screen Time (mins)" icon={<Clock size={16} />} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Your Stories</h1>
        <div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition-colors mr-4"
            data-testid="profile-settings-button"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={() => setShowStoryModal(true)}
            className="bg-primary text-dark-bg py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
          >
            Generate New Story
          </button>
        </div>
      </div>

      {stories.length === 0 ? (
        <p className="text-text-sub">You don't have any stories yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story._id} className="bg-card-bg rounded-lg shadow-lg overflow-hidden">
              <img src={story.thumbnailUrl || 'https://via.placeholder.com/150'} alt="Story thumbnail" className="w-full h-40 object-cover"/>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{story.childId.name}'s Story</h2>
                <p className="text-text-sub text-sm mb-4">
                  {new Date(story.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-4">
                  <Link to={`/story/${story._id}`} className="text-green-400 hover:underline flex items-center space-x-2">
                    <Play size={16} />
                    <span>Play</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Story Generation Modal */}
      {showStoryModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-card-bg p-8 rounded-lg shadow-lg">
           <h2 className="text-2xl font-bold mb-4">Select a Profile to Generate Story</h2>
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
           <button onClick={() => setShowStoryModal(false)} className="mt-4 text-red-500">Cancel</button>
         </div>
       </div>
      )}

      {/* Profile Settings Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card-bg p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            {profiles.map(profile => (
              <div key={profile._id} className="flex items-center justify-between mb-2">
                <span>{profile.name}</span>
                <label className="flex items-center cursor-pointer">
                  <span className="mr-3">Islamic Faceless Mode</span>
                  <div className="relative">
                    <input type="checkbox" checked={profile.facelessMode} onChange={() => handleFacelessModeToggle(profile)} className="sr-only" />
                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${profile.facelessMode ? 'transform translate-x-6 bg-primary' : ''}`}></div>
                  </div>
                </label>
              </div>
            ))}
            <button onClick={() => setShowProfileModal(false)} className="mt-4 text-red-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
