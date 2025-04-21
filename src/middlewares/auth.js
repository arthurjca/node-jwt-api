import jwt from 'jsonwebtoken';
import { redisClient } from '../config/redis.js';

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token not found' });

  const isInvalidToken = await redisClient.exists(`invalidated_tokens:${token}`);
  if (isInvalidToken) return res.status(401).json({ error: 'Invalid token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default auth;