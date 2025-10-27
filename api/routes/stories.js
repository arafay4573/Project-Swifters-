const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateStory, getStories } = require('../controllers/storyController');

router.post('/generate', auth, generateStory);
router.get('/', auth, getStories);

module.exports = router;
