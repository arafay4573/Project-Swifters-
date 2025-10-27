const ChildProfile = require('../models/ChildProfile');

exports.createProfile = async (req, res) => {
  const { name, age, preferences } = req.body;

  try {
    const newProfile = new ChildProfile({
      parentId: req.user.id,
      name,
      age,
      preferences,
    });

    const profile = await newProfile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await ChildProfile.find({ parentId: req.user.id });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  const { name, age, preferences } = req.body;

  const profileFields = { name, age, preferences };

  try {
    let profile = await ChildProfile.findById(req.params.id);

    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    if (profile.parentId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
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

exports.deleteProfile = async (req, res) => {
  try {
    let profile = await ChildProfile.findById(req.params.id);

    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    if (profile.parentId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await ChildProfile.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Profile removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
