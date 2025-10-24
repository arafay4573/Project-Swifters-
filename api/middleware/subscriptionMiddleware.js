const User = require('../models/User');
const Story = require('../models/Story');

const checkSubscription = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.subscriptionStatus === 'Premium') {
    return next();
  }

  const storiesCount = await Story.countDocuments({ userId: req.user.id });

  if (storiesCount >= 2) {
    return res.status(403).json({ message: 'Free plan limit reached. Please upgrade to premium.' });
  }

  next();
};

module.exports = { checkSubscription };
