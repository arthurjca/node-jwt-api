import { Schema, model } from 'mongoose';

const roles = ['USER', 'ADMIN', 'MODERATOR'];

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  refreshTokens: [{
    token: String,
    expiresAt: Date,
  }],
  role: {
    type: String,
    enum: roles,
    default: 'USER'
  }
});

export default model('User', UserSchema);  