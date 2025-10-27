const express = require('express');
const router = express.Router();
const { getAnalyticsSummary, trackEngagement } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// @route   GET /api/analytics/summary
// @desc    Get analytics summary for all children of the logged-in parent
// @access  Private
router.get('/summary', auth, getAnalyticsSummary);

// @route   POST /api/analytics/track-engagement
// @desc    Tracks story completion and screen time
// @access  Private
router.post('/track-engagement', auth, trackEngagement);

module.exports = router;
