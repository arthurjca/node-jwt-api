import 'dotenv/config';  // Carrega as variáveis do .env antes de qualquer coisa
import express from 'express';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
import connectDB from './src/config/mongo.js';
import { connectRedis } from './src/config/redis.js';
import { getAllUsers, createUser, getUser } from './src/controllers/userController.js';
import { login, logout, refreshToken } from './src/controllers/authController.js';
import validateUser from './src/middlewares/validateUser.js';
import auth from './src/middlewares/auth.js';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const swaggerDocs = JSON.parse(readFileSync('./swagger.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.send('API Node.js + JWT');
});
app.get('/users', auth, getAllUsers);
app.post('/users', validateUser, createUser);
app.post('/login', login);
app.post('/logout', auth, logout)
app.get('/users/:id', auth, getUser);
app.post('/refresh-token', refreshToken);

const startServer = async () => {
  try {
    await connectRedis();
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();