// mongoose.d.ts
import { Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  username: string;
  password?: string;
  image: string;
  provider: 'manual' | 'google';
  providerId?: string;
}
