const Story = require('../models/Story');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Generate a new story
// @route   POST /api/stories/generate-story
// @access  Private
const generateStory = async (req, res) => {
  const { childName, age, gender, interests, mood } = req.body;

  try {
    // In a real application, you would call an AI API here.
    // For now, we'll just generate a placeholder story.
    const storyText = `Once upon a time, in a magical land, there lived a brave ${gender} named ${childName}. ${childName} was ${age} years old and loved ${interests.join(', ')}. One day, ${childName} went on a ${mood} adventure and discovered a hidden treasure.`;
    const moral = "The moral of the story is to always be brave and kind.";

    res.json({ storyText, moral });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a story
// @route   POST /api/stories/save-story
// @access  Private
const saveStory = async (req, res) => {
  const { childName, age, gender, interests, mood, storyText, moral, audioUrl, videoUrl } = req.body;

  try {
    const story = new Story({
      userId: req.user._id,
      childName,
      age,
      gender,
      interests,
      mood,
      storyText,
      moral,
      audioUrl,
      videoUrl,
    });

    const createdStory = await story.save();
    res.status(201).json(createdStory);
  } catch (error)
 {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all stories for a user
// @route   GET /api/stories
// @access  Private
const getStories = async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.user._id });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateStory, saveStory, getStories };
