const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'user', // Tham chiếu tới collection User
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const CommentModel = mongoose.model('comment', commentSchema);
module.exports = CommentModel;
