import mongoose from 'mongoose'
import config from '../config/config'
import logger from '../utils/logger'

export default mongoose.connect(config.mongoose.url).then(() => {
  logger.info('connected to mongoDB')
});