import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import StoryContext from '../context/StoryContext';

const StoryForm = () => {
  const [formData, setFormData] = useState({
    childName: '',
    age: '5',
    gender: 'boy',
    interests: [],
    mood: 'Happy',
    photo: null,
  });
  const { generateStory, loading } = useContext(StoryContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateStory(formData);
  };

  if (loading) {
    return (
      <div className="text-center">
        <p className="text-lg text-text-sub mb-4">Writing your magical story...</p>
        <div className="w-full bg-dark-bg rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-card-bg p-8 rounded-lg shadow-lg max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <label htmlFor="childName" className="block text-text-sub mb-2">Child's Name</label>
        <input
          type="text"
          name="childName"
          id="childName"
          value={formData.childName}
          onChange={handleChange}
          className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-text-sub mb-2">Child's Age</label>
        <select
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {Array.from({ length: 10 }, (_, i) => i + 3).map((age) => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-text-sub mb-2">Child's Gender</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input type="radio" name="gender" value="boy" checked={formData.gender === 'boy'} onChange={handleChange} className="mr-2" />
            Boy
          </label>
          <label className="flex items-center">
            <input type="radio" name="gender" value="girl" checked={formData.gender === 'girl'} onChange={handleChange} className="mr-2" />
            Girl
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-text-sub mb-2">Interests</label>
        <div className="flex flex-wrap gap-2">
          {['animals', 'space', 'magic', 'adventure'].map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestChange(interest)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                formData.interests.includes(interest)
                  ? 'bg-primary text-dark-bg'
                  : 'bg-dark-bg text-text-sub'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="photo" className="block text-text-sub mb-2">Upload Photo (Optional)</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col w-full h-32 border-4 border-dashed border-gray-700 hover:bg-gray-800 hover:border-gray-600 rounded-lg cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-7">
              <Upload className="text-gray-500" />
              <p className="pt-1 text-sm tracking-wider text-gray-500">
                {formData.photo ? formData.photo.name : 'Select a photo'}
              </p>
            </div>
            <input type="file" onChange={handlePhotoChange} className="opacity-0" />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all shadow-glow-secondary"
      >
        Generate Story
      </button>
    </motion.form>
  );
};

export default StoryForm;
