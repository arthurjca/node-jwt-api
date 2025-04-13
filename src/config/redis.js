import { createClient } from 'redis';

const client = createClient({
  username: 'default',
  password: 'P53JHzdENLyBS8dsRqjv4UhDTmq7cPkv',
  socket: {
    host: 'redis-18408.crce181.sa-east-1-2.ec2.redns.redis-cloud.com',
    port: 18408
  }
});

client.on('error', err => console.log('Redis Client Error', err));

// Conecta ao Redis e exporta o client
export async function connectRedis() {
  await client.connect();
  await client.set('foo', 'bar');
  const result = await client.get('foo');
  console.log(result);  // >>> bar
  return client;
}

export default client;