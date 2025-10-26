const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');

// @route   GET api/profiles
// @desc    Get all of a user's child profiles
// @access  Private
router.get('/', auth, getProfiles);

// @route   POST api/profiles
// @desc    Create a new child profile
// @access  Private
router.post('/', auth, createProfile);

// @route   PUT api/profiles/:id
// @desc    Update a child profile
// @access  Private
router.put('/:id', auth, updateProfile);

// @route   DELETE api/profiles/:id
// @desc    Delete a child profile
// @access  Private
router.delete('/:id', auth, deleteProfile);

module.exports = router;
