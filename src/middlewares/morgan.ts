import logger from "../utils/logger";
import morgan from 'morgan'
import { Middleware } from '../types/Middleware'

const morganMiddleware: Middleware = morgan('dev', { 
  stream: { write: (message) => logger.http(message.trim()) },
})

export default morganMiddleware