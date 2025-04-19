import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connect(process.env.MONGODB_URI);
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('Error on MongoDB connection:', err.message);
  }
};

export default connectDB;  