import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client: RedisClient = createClient({
    url: redisUrl,
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
    await client.connect();
    console.log('Connected to Redis');
}

export { client, connectRedis };
