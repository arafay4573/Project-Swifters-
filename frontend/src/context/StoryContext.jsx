import React, { createContext, useState, useContext } from 'react';
import api from '../api';
import AuthContext from './AuthContext';

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const generateStory = async (formData) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await api.post('/stories/generate-story', formData, config);
      setStory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoryContext.Provider value={{ story, loading, generateStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContext;
