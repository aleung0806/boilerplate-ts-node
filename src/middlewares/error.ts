import logger from "../utils/logger";

const error = (err, req, res, next) => {
  const { statusCode, message } = err
  logger.error(`${statusCode}: ${message}`)
  res.status(statusCode).send(message)
};

export default error