import pkg from 'jsonwebtoken';
import { hash } from 'bcryptjs';

const { sign } = pkg;
const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return sign({ id: user.id }, secret, { expiresIn: '1h' });
};

const hashPassword = async (password) => {
  return await hash(password, 10);
};

export { generateToken, hashPassword };