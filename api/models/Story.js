const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  childName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  storyText: {
    type: String,
    required: true,
  },
  moral: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
