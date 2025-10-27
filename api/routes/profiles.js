const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');

router.post('/', auth, createProfile);
router.get('/', auth, getProfiles);
router.put('/:id', auth, updateProfile);
router.delete('/:id', auth, deleteProfile);

module.exports = router;
