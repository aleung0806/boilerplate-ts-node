const app = require("./app");
const http = require("http");
const config = require('./config/config')
const mongoose = require('mongoose');
const logger = require("./utils/logger");

const server = http.createServer(app);
const port = config.port;

mongoose.connect(config.mongoose.url).then(() => {
  logger.info('connected to mongoDB')
});

server.listen(port, () => {
  logger.info(`server running on port ${port}`);
});


