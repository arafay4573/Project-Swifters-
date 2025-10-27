const mongoose = require('mongoose');

const ChildProfileSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  preferences: {
    type: Object,
  },
  photoUrl: {
    type: String,
  },
  facelessMode: {
    type: Boolean,
    default: false,
  },
  totalStoriesRead: {
    type: Number,
    default: 0,
  },
  totalQuizScore: {
    type: Number,
    default: 0,
  },
  totalScreenTime: {
    type: Number,
    default: 0,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ChildProfile', ChildProfileSchema);
