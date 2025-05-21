import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },  password: {
    type: String,
    required: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function(this: any) {
        return this.provider === 'manual';
      },
      'Password is required for manual registration'
    ]
  },
  image: {
    type: String,
    default: '/Default.jpg'
  },
  provider: {
    type: String,
    enum: ['manual', 'google'],
    required: true
  },
  providerId: {
    type: String,
    unique: true,
    sparse: true
  }
});

const User = models.User || model('User', userSchema);

export default User;

