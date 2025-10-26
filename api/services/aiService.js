// Mock service to simulate OpenAI and ElevenLabs API calls

// Simulates generating a story with OpenAI
const generateStory = async (prompt) => {
  console.log(`[Mock AI] Generating story for prompt: "${prompt}"`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mockStory = {
    title: "The Magical Forest Adventure",
    text: `Once upon a time, in a magical forest, lived a brave squirrel named Squeaky. ${prompt}. Squeaky and his friends discovered a hidden waterfall that granted wishes. They wished for endless acorns and lived happily ever after.`,
    coverImageUrl: 'https://via.placeholder.com/1024x1024.png?text=Magical+Forest',
  };

  console.log('[Mock AI] Story generated successfully.');
  return mockStory;
};

// Simulates generating audio with ElevenLabs
const generateAudio = async (text) => {
  console.log(`[Mock AI] Generating audio for text: "${text.substring(0, 50)}..."`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockAudioUrl = 'https://storage.googleapis.com/spec-host-gcp-public-images/g-business-profile-pub-livestream/videos/qualifiers-2023-sample-video.mp4'; // Placeholder URL

  console.log(`[Mock AI] Audio generated: ${mockAudioUrl}`);
  return mockAudioUrl;
};

module.exports = {
  generateStory,
  generateAudio,
};
