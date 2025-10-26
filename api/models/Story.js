const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  childProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChildProfile',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: [{
    paragraph: { type: String, required: true },
    audioUrl: { type: String, required: true },
    animationUrl: { type: String },
  }],
  quiz: [{
    question: { type: String },
    options: [{ type: String }],
    correctAnswer: { type: String },
  }],
  moralLesson: {
    type: String,
  },
  isFacelessMode: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Story', StorySchema);
