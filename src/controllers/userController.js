import { compareSync } from 'bcryptjs';
import { generateToken, hashPassword } from '../auth/auth.js';
import User from '../models/User.js';

const users = [];

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
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // Simulando um usuário válido (em um app real, buscaria no banco de dados)  
  const user = await User.findOne({ email });
  console.log({ user })

  if (compareSync(password, user.password)) {
    console.log({ oi: "oi" })
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
};

export { getAllUsers, createUser, login };