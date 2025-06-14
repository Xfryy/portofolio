import { Document } from 'mongoose';

export interface UserType extends Document {
  email: string;
  username: string;
  password?: string;
  image?: string;
  provider: 'manual' | 'google';
}
