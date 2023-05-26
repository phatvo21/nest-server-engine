// eslint-disable-next-line import/no-extraneous-dependencies
import { Cluster, Redis as IoRedis, RedisOptions } from 'ioredis';

export type RedisInterface = IoRedis &
  Cluster & {
    /** Start the redis service */
    init: () => void;
    /** Stop the redis service */
    shutdown: () => Promise<void>;
  };

/** Options to initialize a Redis client */
export interface RedisCreateOptions {
  /** Cluster connection settings */
  connection?: any;
  /** Redis client settings */
  redis?: RedisOptions;
  /** Should the client perform readiness check when establishing the connection */
  enableReadyCheck?: boolean;
  /** Cluster mode read operation settings, can make reads on masters, slaves, or both */
  scaleReads?: string;
  /** Should Redis be initialized in Cluster mode */
  cluster?: boolean;
}
