
import app from './app'
import http from 'http'
import config from './config/config'
import mongoose from 'mongoose'
import logger from './utils/logger'

const server = http.createServer(app);
const port = config.port;

mongoose.connect(config.mongoose.url).then(() => {
  logger.info('connected to mongoDB')
});

server.listen(port, () => {
  logger.info(`server running on port ${port}`);
});


