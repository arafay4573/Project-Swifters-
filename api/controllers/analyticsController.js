const ChildProfile = require('../models/ChildProfile');

// @route   GET /api/analytics/summary
// @desc    Get analytics summary for all children of the logged-in parent
// @access  Private
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const children = await ChildProfile.find({ parentId: req.user.id });

    if (!children) {
      return res.status(404).json({ msg: 'No children found for this user' });
    }

    const analyticsSummary = children.map(child => ({
      childId: child._id,
      name: child.name,
      totalStoriesRead: child.totalStoriesRead,
      // Calculate average quiz score, avoiding division by zero
      averageQuizScore: child.totalStoriesRead > 0 ? (child.totalQuizScore / child.totalStoriesRead).toFixed(2) : 0,
      totalScreenTime: child.totalScreenTime, // in minutes
      lastActive: child.lastActive,
    }));

    res.json(analyticsSummary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/analytics/track-engagement
// @desc    Tracks story completion and screen time for a child
// @access  Private
exports.trackEngagement = async (req, res) => {
  const { childId, duration } = req.body; // duration in minutes

  try {
    const child = await ChildProfile.findById(childId);
    if (!child) {
      return res.status(404).json({ msg: 'Child profile not found' });
    }

    // Ensure the parent owns this child profile
    if (child.parentId.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }

    child.totalStoriesRead += 1;
    child.totalScreenTime += duration; // Add duration in minutes

    await child.save();

    res.json({ msg: 'Engagement tracked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
