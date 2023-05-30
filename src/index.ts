
import app from './app'
import http from 'http'
import config from './config/config'
import logger from './utils/logger'
import './db/mongoose'

const server = http.createServer(app);
const port = config.port;

server.listen(port, () => {
  logger.info(`server running on port ${port}`);
});


