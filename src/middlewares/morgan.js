const logger = require("../utils/logger");
const morgan = require('morgan')

const morganMiddleware = morgan('dev', { 
  stream: { write: (message) => logger.http(message.trim()) },
})

module.exports = morganMiddleware