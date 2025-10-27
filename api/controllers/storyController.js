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

    const { storyText, moral, quizQuestions } = await aiService.generateStory(childProfile, childProfile.facelessMode);
    const { audioUrl } = await aiService.generateVoice(storyText);
    const { animationUrl, thumbnailUrl } = await aiService.generateAnimation(storyText, childProfile.facelessMode);

    const newStory = new Story({
      childId,
      storyText,
      moral,
      quizQuestions,
      audioUrl,
      animationUrl,
      thumbnailUrl,
    });

    const story = await newStory.save();
    res.json(story);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/stories/:id/quiz
// @desc    Submit quiz answers for a story
// @access  Private
exports.submitQuiz = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }

    const { answers } = req.body; // Expecting an array of strings
    let score = 0;
    const submittedAnswers = [];

    story.quizQuestions.forEach((question, index) => {
      if (answers[index] && answers[index].toLowerCase() === question.correctAnswer.toLowerCase()) {
        score++;
      }
      submittedAnswers.push({
        questionIndex: index,
        answer: answers[index] || 'Not answered',
      });
    });

    story.quizAnswers = submittedAnswers;
    await story.save();

    const childProfile = await ChildProfile.findById(story.childId);
    if (childProfile) {
      childProfile.totalQuizScore += score;
      await childProfile.save();
    }

    res.json({ score, totalQuestions: story.quizQuestions.length });
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

    // Update lastActive timestamp for the child
    const childProfile = await ChildProfile.findById(story.childId._id);
    if (childProfile) {
      childProfile.lastActive = Date.now();
      await childProfile.save();
    }

    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
