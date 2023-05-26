const logger = require('../utils/logger');
const { StatusCodes } = require('http-status-codes')
const ApiError = require('../utils/ApiError')


const validate = (schema) => (req, res, next) => {
  const values = {}
  const errors = []
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
  req.values = values
  return next();
};

module.exports = validate