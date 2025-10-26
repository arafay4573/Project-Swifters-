const ChildProfile = require('../models/ChildProfile');

// Get all of a user's child profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await ChildProfile.find({ parentId: req.user.id });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new child profile
exports.createProfile = async (req, res) => {
  const { name, age, interests, theme, photoUrl } = req.body;

  try {
    const newProfile = new ChildProfile({
      parentId: req.user.id,
      name,
      age,
      interests,
      theme,
      photoUrl,
    });

    const profile = await newProfile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a child profile
exports.updateProfile = async (req, res) => {
  const { name, age, interests, theme, photoUrl } = req.body;

  // Build profile object
  const profileFields = {};
  if (name) profileFields.name = name;
  if (age) profileFields.age = age;
  if (interests) profileFields.interests = interests;
  if (theme) profileFields.theme = theme;
  if (photoUrl) profileFields.photoUrl = photoUrl;

  try {
    let profile = await ChildProfile.findById(req.params.id);

    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Make sure user owns profile
    if (profile.parentId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    profile = await ChildProfile.findByIdAndUpdate(
      req.params.id,
      { $set: profileFields },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a child profile
exports.deleteProfile = async (req, res) => {
  try {
    let profile = await ChildProfile.findById(req.params.id);

    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Make sure user owns profile
    if (profile.parentId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await ChildProfile.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Profile removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
