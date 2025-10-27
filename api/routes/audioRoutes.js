const express = require('express');
const router = express.Router();
const { generateAudio } = require('../controllers/audioController');
const { protect } = require('../middleware/authMiddleware');

router.route('/generate-audio').post(protect, generateAudio);

module.exports = router;
