import React, { useContext } from 'react';
import StoryForm from '../components/StoryForm';
import StoryCard from '../components/StoryCard';
import StoryContext from '../context/StoryContext';

const StoryFormPage = () => {
  const { story } = useContext(StoryContext);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Create Your Story</h1>
      {story ? <StoryCard storyText={story.storyText} /> : <StoryForm />}
    </div>
  );
};

export default StoryFormPage;
