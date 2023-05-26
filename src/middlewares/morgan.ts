import logger from "../utils/logger";
import morgan from 'morgan'

const morganMiddleware = morgan('dev', { 
  stream: { write: (message) => logger.http(message.trim()) },
})

export default morganMiddleware