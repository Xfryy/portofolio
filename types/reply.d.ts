// reply.d.ts
import { Document, Types } from 'mongoose';

export interface ReplyDocument extends Document {
  content: string;
  userId: Types.ObjectId;
  username: string;
  userImage: string;
  commentId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}