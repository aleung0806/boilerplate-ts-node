import expressSession from "express-session";
import config from '../config/config'
import { redisStore } from '../db/redis';
import ApiError from "../utils/ApiError";
import logger from "../utils/logger";
import { StatusCodes } from 'http-status-codes'
import { Middleware } from '../types/Middleware'

const session = expressSession({
  store: redisStore,
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    sameSite: "lax",
  },
});

const log: Middleware = (req, _res, next) => {
  if (req.session.user){
    logger.info(`session: ${JSON.stringify(req.session.user)}`)
  }
  next();
};



export default [session, log]
