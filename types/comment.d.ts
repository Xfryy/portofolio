// comment.d.ts
import { Document, Types } from 'mongoose';
import { ReplyDocument } from './reply';

export interface CommentDocument extends Document {
  content: string;
  userId: Types.ObjectId;
  username: string;
  userImage: string;
  replies: Types.ObjectId[] | ReplyDocument[];
  createdAt: Date;
  updatedAt: Date;
}