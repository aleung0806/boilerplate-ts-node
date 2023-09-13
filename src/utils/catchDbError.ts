import ApiError from '../utils/ApiError'
import logger from './logger'

export const catchDbError = (request) => {
  return request
    .then(data => {
      return data
    })
    .catch(err => {
      logger.error(err)
      throw new ApiError(500, 'Database error.')
    })
}