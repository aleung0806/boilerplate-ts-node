import logger from "../utils/logger";
import { ErrorMiddleware } from "src/types/Middleware"

const error: ErrorMiddleware = (err, _req, res, _next) => {
  const { statusCode, message } = err
  logger.error(`${statusCode}: ${message}`)
  res.status(statusCode).send(message)
};

export default error