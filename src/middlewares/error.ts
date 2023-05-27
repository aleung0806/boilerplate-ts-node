import logger from "../utils/logger";

const error = (err, _req, res, _next) => {
  const { statusCode, message } = err
  logger.error(`${statusCode}: ${message}`)
  res.status(statusCode).send(message)
};

export default error