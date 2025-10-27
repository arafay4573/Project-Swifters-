const { OpenAI } = require('openai');
const axios = require('axios');

// Initialize OpenAI client if the API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const generateStory = async (childData, facelessMode = false) => {
  if (!openai) {
    console.log('OpenAI API key not found. Falling back to mock story generation.');
    return {
      storyText: `This is a mock story about a brave child named ${childData.name} who loves ${childData.preferences.animal || 'animals'}. One day, ${childData.name} went on an adventure and discovered a hidden treasure. The treasure was a magical book.`,
      moral: "The moral of this mock story is that bravery and kindness always lead to wonderful discoveries.",
      quizQuestions: [
        { question: "What did the child find?", options: ["A magical book", "A lost puppy", "A shiny rock", "A bag of candy"], correctAnswer: "A magical book" },
        { question: "What is the child's name?", options: [childData.name, "Alex", "Sam", "Charlie"], correctAnswer: childData.name },
        { question: "What does the child love?", options: [childData.preferences.animal || 'animals', "Playing video games", "Watching TV", "Sleeping"], correctAnswer: childData.preferences.animal || 'animals' },
      ],
    };
  }

  let prompt = `Create a short, engaging, and educational children's story for a child named ${childData.name}, who is ${childData.age} years old and loves ${childData.preferences.animal || 'adventure'}. After the story, provide a clear moral lesson. Finally, create a 3-question multiple-choice quiz based on the story's content. The output must be a single JSON object with three keys: "storyText", "moral", and "quizQuestions". The "quizQuestions" key should be an array of objects, where each object has three keys: "question" (string), "options" (an array of 4 strings), and "correctAnswer" (the exact string from the options array that is correct).`;

  if (facelessMode) {
    prompt += ` The story should be suitable for illustrations where characters have no facial features, in line with Islamic artistic traditions.`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating story from OpenAI:', error);
    // Fallback to mock data on API error
    return {
      storyText: `A mock story for ${childData.name}.`,
      moral: "A mock moral.",
      quizQuestions: [
        { question: "Mock Question 1?", options: ["A", "B", "C", "D"], correctAnswer: "A" },
        { question: "Mock Question 2?", options: ["A", "B", "C", "D"], correctAnswer: "B" },
        { question: "Mock Question 3?", options: ["A", "B", "C", "D"], correctAnswer: "C" },
      ],
    };
  }
};

const generateVoice = async (storyText) => {
  if (!process.env.ELEVENLABS_API_KEY) {
    console.log('ElevenLabs API key not found. Falling back to mock voice generation.');
    return { audioUrl: '/audio/mock-story-audio.mp3' };
  }

  try {
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', // Adam voice ID
      { text: storyText },
      {
        headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
        responseType: 'arraybuffer',
      }
    );
    // In a real application, you would save this audio file to a cloud storage (like S3)
    // and return the URL. For now, we are returning a placeholder.
    console.log('Voice generated successfully from ElevenLabs.');
    return { audioUrl: '/audio/generated-story-audio.mp3' };
  } catch (error) {
    console.error('Error generating voice from ElevenLabs:', error);
    return { audioUrl: '/audio/mock-story-audio.mp3' };
  }
};

const generateAnimation = async (storyText, facelessMode = false) => {
  if (!process.env.DID_API_KEY) {
    console.log('D-ID API key not found. Falling back to mock animation generation.');
    return {
      animationUrl: '/videos/mock-story-animation.mp4',
      thumbnailUrl: `https://via.placeholder.com/150/161B22/FFFFFF?text=Story`
    };
  }

  // D-ID integration is more complex and would require a source image URL.
  // We will simulate the call and return a mock URL.
  console.log('Simulating D-ID animation generation.');
  let prompt = storyText;
  if(facelessMode){
    prompt += " (faceless characters)";
  }

  return {
    animationUrl: '/videos/mock-story-animation.mp4',
    thumbnailUrl: `https://via.placeholder.com/150/161B22/FFFFFF?text=Story`
  };
};

module.exports = {
  generateStory,
  generateVoice,
  generateAnimation,
};
