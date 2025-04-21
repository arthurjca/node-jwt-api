import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';

const { sign } = jwt;

const generateAccessToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return sign({ id: user.id }, secret, { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

const hashPassword = async (password) => {
  return await hash(password, 10);
};

export { generateAccessToken, generateRefreshToken, hashPassword };