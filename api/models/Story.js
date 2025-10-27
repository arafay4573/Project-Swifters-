const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChildProfile',
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
  animationUrl: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Story', StorySchema);
