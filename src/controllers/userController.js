import { hashPassword } from '../auth/auth.js';
import { redisClient } from '../config/redis.js';
import User from '../models/User.js';

const getAllUsers = async (req, res) => {
  const users = await User.find({}, 'name email createdAt');
  res.json(users);
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ id: user._id, name, email });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "E-mail already taken" });
    }
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const cachedUser = await redisClient.get(`user:${id}`);

  if (cachedUser)
    return res.json(JSON.parse(cachedUser));

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  await redisClient.set(`user:${id}`, JSON.stringify(user), { EX: 1800 });
  res.json(user);
};

export { getAllUsers, createUser, getUser };