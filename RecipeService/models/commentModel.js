const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  recipe: {
    type: mongoose.Types.ObjectId,
    ref: 'recepie',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
