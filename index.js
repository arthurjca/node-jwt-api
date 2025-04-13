import { readFileSync } from 'fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { connectRedis } from './src/config/redis.js';
import connectDB from './src/config/mongo.js';
import { getAllUsers, createUser, login } from './src/controllers/userController.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const swaggerDocs = JSON.parse(readFileSync('./swagger.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.send('API Node.js + JWT');
});
app.get('/users', getAllUsers);
app.post('/users', createUser);
app.post('/login', login);

const PORT = 3000;

async function startRedis() {
  try {
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar servidor:', error);
  }
}

startRedis();

connectDB();  