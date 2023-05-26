import session from "express-session";
import redis from 'redis'
import redisStore from "connect-redis")(session;

import logger from '../utils/logger';
import config from '../config/config'

const redisClient = redis.createClient({
  url: config.redis.url,
  legacyMode: true,
});

redisClient.connect().then(() => {
    logger.info("connected to redis");
});

module.exports = {
  redisClient, 
  redisStore: new redisStore({ client: redisClient })
}