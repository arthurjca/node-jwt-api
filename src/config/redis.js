import { createClient } from 'redis';

const { REDIS_PW: password, REDIS_HOST: host, REDIS_PORT: port } = process.env;

const client = createClient({
  username: 'default',
  password,
  socket: { host, port }
});

let isConnected = false;

client.on('error', err => console.error('Redis Client Error:', err));

const connectRedis = async () => {
  if (isConnected) return client;

  try {
    console.log('Connecting to Redis...');
    await client.connect();
    isConnected = true;
    console.log('Redis connected!');
    return client;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
  }
}

export { connectRedis, client as redisClient };