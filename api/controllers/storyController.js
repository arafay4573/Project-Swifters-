const Story = require('../models/Story');
const ChildProfile = require('../models/ChildProfile');
const aiService = require('../services/aiService');

exports.generateStory = async (req, res) => {
  const { childId } = req.body;
  try {
    const childProfile = await ChildProfile.findById(childId);
    if (!childProfile) {
      return res.status(404).json({ msg: 'Child profile not found' });
    }

    const { storyText } = await aiService.generateStory(childProfile);
    const { audioUrl } = await aiService.generateVoice(storyText);
    const { animationUrl } = await aiService.generateAnimation(storyText);

    const newStory = new Story({
      childId,
      storyText,
      audioUrl,
      animationUrl,
    });

    const story = await newStory.save();
    res.json(story);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getStories = async (req, res) => {
  try {
    const profiles = await ChildProfile.find({ parentId: req.user.id });
    const profileIds = profiles.map(p => p._id);

    const stories = await Story.find({ childId: { $in: profileIds } })
      .populate('childId', ['name'])
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('childId', ['name']);

    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }

    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
