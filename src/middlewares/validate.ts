import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { Middleware } from '../types/Middleware'

const validate = (schema: object): Middleware => (req, _res, next) => {
  const values = {}
  const errors: Array<Error> = []
  Object.keys(schema).forEach(key => {
    const { value, error } = schema[key].validate(req[key], {abortEarly: false})
    logger.debug(`key: ${key}`)
    if (error) { errors.push(error) }
    Object.assign(values, value)
  })
  if (errors.length){
    const message = errors.join('. ')
    return next(new ApiError(StatusCodes.BAD_REQUEST, message))
  }
  //req.values = values

  return next();
};

export default validate