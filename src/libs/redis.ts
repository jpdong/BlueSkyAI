import Redis from 'ioredis';

let redis: Redis | null = null;
let subscriber: Redis | null = null;

export function getRedis(): Redis {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL;
    
    if (!redisUrl) {
      console.warn('REDIS_URL not configured, Redis features will be disabled');
      // 返回一个mock对象，避免错误
      return {
        publish: () => Promise.resolve(0),
        subscribe: () => Promise.resolve(),
        on: () => {},
        disconnect: () => Promise.resolve(),
      } as any;
    }

    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    redis.on('connect', () => {
      console.log('Connected to Redis');
    });
  }

  return redis;
}

export function getRedisSubscriber(): Redis {
  if (!subscriber) {
    const redisUrl = process.env.REDIS_URL;
    
    if (!redisUrl) {
      console.warn('REDIS_URL not configured, Redis subscriber features will be disabled');
      return {
        subscribe: () => Promise.resolve(),
        on: () => {},
        disconnect: () => Promise.resolve(),
      } as any;
    }

    subscriber = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    subscriber.on('error', (error) => {
      console.error('Redis subscriber connection error:', error);
    });

    subscriber.on('connect', () => {
      console.log('Connected to Redis subscriber');
    });
  }

  return subscriber;
}

export async function publishTaskUpdate(taskId: string, status: number, data: any) {
  try {
    const redis = getRedis();
    const message = {
      type: 'status_update',
      taskId,
      status,
      data,
      timestamp: new Date().toISOString(),
    };

    await redis.publish(`task_status:${taskId}`, JSON.stringify(message));
    console.log('Published task update to Redis:', taskId, status);
  } catch (error) {
    console.error('Failed to publish task update:', error);
  }
}

export async function disconnectRedis() {
  try {
    if (redis) {
      await redis.disconnect();
      redis = null;
    }
    if (subscriber) {
      await subscriber.disconnect();
      subscriber = null;
    }
  } catch (error) {
    console.error('Error disconnecting Redis:', error);
  }
}