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
});

module.exports = mongoose.model('ChildProfile', ChildProfileSchema);
