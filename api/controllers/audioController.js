const julesAPI = require('../config/julesConfig');

// @desc    Generate audio from text
// @route   POST /api/audio/generate-audio
// @access  Private
const generateAudio = async (req, res) => {
  const { storyText, voice } = req.body;

  try {
    const response = await julesAPI.post('/audio/generate', {
      storyText,
      voice,
    });

    const { audioUrl } = response.data;
    res.json({ audioUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateAudio };
