import session from "express-session";
import redis from 'redis'
import _redisStore from "connect-redis";

import logger from '../utils/logger';
import config from '../config/config'

export const redisClient = redis.createClient({
  url: config.redis.url,
  legacyMode: true,
});

redisClient.connect().then(() => {
    logger.info("connected to redis");
});


export const redisStore = new _redisStore({ client: redisClient })