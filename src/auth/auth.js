import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';

const { sign } = jwt;

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return sign({ id: user.id }, secret, { expiresIn: '1h' });
};

const hashPassword = async (password) => {
  return await hash(password, 10);
};

export { generateToken, hashPassword };