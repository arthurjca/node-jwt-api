const express = require('express');
const app = express();
const { getAllUsers, createUser } = require('./src/controllers/userController');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Node.js + JWT');
});
app.get('/users', getAllUsers);
app.post('/users', createUser);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});