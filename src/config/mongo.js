import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado!');
  } catch (err) {
    console.error('Erro na conexão:', err.message);
  }
};

export default connectDB;  