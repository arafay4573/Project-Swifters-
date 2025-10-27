import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const StoryPlayer = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const { user } = useContext(AuthContext);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const startTime = useRef(new Date());

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const config = { headers: { 'x-auth-token': user.token } };
        const { data } = await axios.get(`/api/stories/${id}`, config);
        setStory(data);
        setAnswers(new Array(data.quizQuestions.length).fill(''));
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    if (user) {
      fetchStory();
    }
  }, [id, user]);

  const handleFinishStory = async () => {
    const endTime = new Date();
    const duration = Math.round((endTime - startTime.current) / (1000 * 60)); // Duration in minutes

    try {
      const config = { headers: { 'x-auth-token': user.token } };
      await axios.post('/api/analytics/track-engagement', { childId: story.childId._id, duration }, config);
    } catch (error) {
      console.error('Error tracking engagement:', error);
    }
    setShowQuiz(true);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'x-auth-token': user.token } };
      const { data } = await axios.post(`/api/stories/${id}/quiz`, { answers }, config);
      setQuizResult(data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!story) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const paragraphs = story.storyText.split('\\n');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">{story.childId.name}'s Adventure</h1>

      {!showQuiz ? (
        <>
          <div className="aspect-video bg-black rounded-lg mb-8 shadow-lg">
            <video key={story.animationUrl} controls className="w-full h-full" src={story.animationUrl}>
               Your browser does not support the video tag.
            </video>
          </div>

          <div className="bg-card-bg p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Story</h2>
            {paragraphs.map((para, index) => (
              <motion.p key={index} className="text-text-sub leading-relaxed mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.5 }}>
                {para}
              </motion.p>
            ))}
          </div>

           <div className="bg-card-bg p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Moral of the Story</h2>
            <motion.p className="text-text-sub leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: paragraphs.length * 0.5 }}>
                {story.moral}
            </motion.p>
          </div>

          <div className="bg-card-bg p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Narration</h2>
            <audio key={story.audioUrl} controls className="w-full" src={story.audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="text-center">
             <button onClick={handleFinishStory} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Finish Story & Start Quiz
             </button>
          </div>
        </>
      ) : (
        <div className="bg-card-bg p-6 rounded-lg shadow-lg">
            {!quizResult ? (
                 <form onSubmit={handleQuizSubmit}>
                    <h2 className="text-3xl font-bold text-center mb-6 text-accent">Quiz Time!</h2>
                    {story.quizQuestions.map((q, index) => (
                        <div key={index} className="mb-6">
                            <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                            {q.options.map((option, i) => (
                                <label key={i} className="block ml-4">
                                    <input type="radio" name={`question-${index}`} value={option} onChange={(e) => handleAnswerChange(index, e.target.value)} required className="mr-2"/>
                                    {option}
                                </label>
                            ))}
                        </div>
                    ))}
                    <div className="text-center">
                        <button type="submit" className="bg-accent hover:bg-primary text-black font-bold py-2 px-6 rounded-full transition duration-300">
                            Submit Quiz
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-accent mb-4">Quiz Complete!</h2>
                    <p className="text-xl mb-4">You scored {quizResult.score} out of {quizResult.totalQuestions}!</p>
                    <p className="text-2xl text-primary font-semibold">Great job, {story.childId.name}! You’ve earned a star! ⭐</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default StoryPlayer;
