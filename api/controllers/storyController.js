const Story = require('../models/Story');
const ChildProfile = require('../models/ChildProfile');

exports.generateStory = async (req, res) => {
  const { childId } = req.body;
  try {
    // This is a placeholder for the AI story generation
    const storyData = {
      childId: childId,
      storyText: 'Once upon a time, in a land far, far away...',
      audioUrl: 'placeholder_audio.mp3',
      animationUrl: 'placeholder_animation.mp4',
    };

    const story = new Story(storyData);
    await story.save();
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getStories = async (req, res) => {
  try {
    // Find all children associated with the logged-in parent
    const profiles = await ChildProfile.find({ parentId: req.user.id });
    const profileIds = profiles.map(p => p._id);

    // Find all stories for those children
    const stories = await Story.find({ childId: { $in: profileIds } })
      .populate('childId', ['name'])
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
