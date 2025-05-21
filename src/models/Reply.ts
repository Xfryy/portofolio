// models/Reply.ts
import { Schema, model, models } from 'mongoose';

const replySchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
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
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
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

const Reply = models.Reply || model('Reply', replySchema);

export default Reply;