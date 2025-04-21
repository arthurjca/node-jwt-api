import { compareSync } from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../auth/auth.js';
import { redisClient } from '../config/redis.js';
import User from '../models/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (compareSync(password, user.password)) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);
    const sevenDays = 604800000; // 7 days in milliseconds
    await User.findByIdAndUpdate(user._id, {
      $push: { refreshTokens: { token: refreshToken, expiresAt: Date.now() + sevenDays } }
    });
    res.json({ token: accessToken, refreshToken });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  await redisClient.set(`invalidated_tokens:${token}`, '1', { EX: 3600 });

  const { refreshToken } = req.body;
  if (refreshToken) {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { refreshTokens: { token: req.body.refreshToken } },
    });
  }

  res.status(200).json({ message: 'Logout done' });
}

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const user = await User.findOne({
    'refreshTokens.token': refreshToken,
    'refreshTokens.expiresAt': { $gt: new Date() },
  });

  if (!user) return res.status(401).json({ error: 'Refresh token inválido' });

  const newAccessToken = generateAccessToken(user._id);
  res.json({ accessToken: newAccessToken });
};

export { login, logout, refreshToken };