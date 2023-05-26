const session = require("express-session");
const redis = require('redis')
const redisStore = require("connect-redis")(session);

const logger = require('../utils/logger');
const config = require('../config/config')

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