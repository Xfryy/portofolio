// models/Comment.ts
import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    default: '/Default.jpg'
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;