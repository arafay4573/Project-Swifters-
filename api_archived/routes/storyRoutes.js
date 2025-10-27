const express = require('express');
const router = express.Router();
const {
  generateStory,
  saveStory,
  getStories,
} = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');
const { checkSubscription } = require('../middleware/subscriptionMiddleware');

router.route('/generate-story').post(protect, checkSubscription, generateStory);
router.route('/save-story').post(protect, saveStory);
router.route('/').get(protect, getStories);

module.exports = router;
