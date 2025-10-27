const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateStory, getStories, getStoryById, submitQuiz } = require('../controllers/storyController');

router.post('/generate', auth, generateStory);
router.get('/', auth, getStories);
router.get('/:id', auth, getStoryById);
router.post('/:id/quiz', auth, submitQuiz);

module.exports = router;
