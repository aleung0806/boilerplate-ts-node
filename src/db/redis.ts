import session from "express-session";
import * as redis from 'redis';
import connectRedis from "connect-redis";

import logger from '../utils/logger';
import config from '../config/config';


const RedisStore = connectRedis(session);

export const redisClient = redis.createClient({
  url: config.redis.url,
  legacyMode: true,
});

redisClient.connect().then(() => {
    logger.info("connected to redis");
});


export const redisStore = new RedisStore({ client: redisClient })