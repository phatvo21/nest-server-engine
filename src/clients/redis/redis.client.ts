import { RedisCreateOptions, RedisInterface } from '@app/engine/clients/redis/redis.types';
import { EngineError } from '@app/engine/engine-errors';
import { DynamicModule, Module } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Cluster, NodeRole, Redis as RedisClient, RedisOptions } from 'ioredis';

// eslint-disable-next-line import/no-mutable-exports
export let redisClient: undefined | RedisClient | Cluster;

@Module({})
export class Redis {
  /**
   * We use a proxy to extend the Redis behavior and allow initialization of the client only when needed while keeping the same interface
   */
  public static client: RedisClient = new Proxy<RedisInterface>(
    // Due to how we do the proxying, we are forced to ignore ts-errors, we could never create an object that respects the interface properly
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    {},
    {
      get(target, property): unknown {
        if (property === 'init') return Redis.init;
        if (property === 'shutdown') return Redis.shutdown;
        // Create the redis client if it does not exist
        if (!redisClient) throw new EngineError({ message: 'Redis client was not initialized' });
        // Call the function on the redis client
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return redisClient[property] as unknown;
      },
    },
  );

  /**
   * On init create client anc connect
   */
  public static init(): DynamicModule {
    // Ignore if already initialized
    if (redisClient) return;
    redisClient = Redis.createRedisClient();
    // eslint-disable-next-line consistent-return
    return {
      module: Redis,
      global: true,
    };
  }

  /**
   * On shutdown close connection and clear client
   */
  public static async shutdown(): Promise<void> {
    if (redisClient) await redisClient.quit();
    redisClient = undefined;
  }

  /**
   * Create Redis client
   */
  public static createRedisClient(options: RedisCreateOptions = {}): RedisClient | Cluster {
    // Throw an error if there is no host initial
    if (!process.env.REDIS_HOST)
      throw new EngineError({
        message: 'Host required to initialize Redis connection',
      });

    const connection: any = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined,
      ...options.connection,
    };

    const redisOptions: RedisOptions = {
      password: process.env.REDIS_PASSWORD,
      ...options.redis,
    };

    const cluster = options.cluster ?? process.env.REDIS_CLUSTER === 'true';
    // Different connection for clusters or non-clusters
    return cluster
      ? new Cluster([{ ...connection }], {
          enableReadyCheck: options.enableReadyCheck ?? true,
          scaleReads: (options.scaleReads as NodeRole) ?? 'master',
          redisOptions,
        })
      : new RedisClient({ ...connection, ...redisOptions });
  }
}
