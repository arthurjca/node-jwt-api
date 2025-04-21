import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';

const { sign } = jwt;

const generateAccessToken = (user) => {
  return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
  return sign(
    { userId, },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

const hashPassword = async (password) => {
  return await hash(password, 10);
};

export { generateAccessToken, generateRefreshToken, hashPassword };