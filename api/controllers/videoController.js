const julesAPI = require('../config/julesConfig');

// @desc    Generate a video from story text and audio
// @route   POST /api/video/generate-video
// @access  Private
const generateVideo = async (req, res) => {
  const { storyText, audioUrl, childName, age } = req.body;

  try {
    const response = await julesAPI.post('/videos/generate', {
      storyText,
      audioUrl,
      childName,
      age,
    });

    const { videoUrl } = response.data;
    res.json({ videoUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateVideo };
