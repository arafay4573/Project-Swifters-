const express = require('express');
const router = express.Router();
const { generateVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

router.route('/generate-video').post(protect, generateVideo);

module.exports = router;
