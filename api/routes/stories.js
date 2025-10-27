const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateStory, getStories, getStoryById } = require('../controllers/storyController');

router.post('/generate', auth, generateStory);
router.get('/', auth, getStories);
router.get('/:id', auth, getStoryById);

module.exports = router;
