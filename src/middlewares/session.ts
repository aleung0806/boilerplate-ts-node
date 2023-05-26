import expressSession from "express-session";
import config from '../config/config'
import { redisStore } from '../db/redis';
import ApiError from "../utils/ApiError";
import logger from "../utils/logger";
import { StatusCodes } from 'http-status-codes'

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

const log = (req, res, next) => {
  if (req.session.user){
    logger.info(`session: ${JSON.stringify(req.session.user)}`)
  }
  next();
};



export default [session, log]
