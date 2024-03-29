import expressSession from "express-session";
import config from '../config/config'
import { redisStore } from '../db/redis';
import ApiError from "../utils/ApiError";
import logger from "../utils/logger";
import { StatusCodes } from 'http-status-codes'
import { Middleware } from '../types/Express'
import { User } from '../types/User'

interface Passport {
  user?: User
}

declare module 'express-session' {
  interface SessionData {
    test?: string
    passport?: Passport
  }
}


const session = expressSession({
  name: 'sessionId',
  store: redisStore,
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    sameSite: "lax",
  },
});

// const log: Middleware = (req, _res, next) => {
//   console.log(JSON.stringify(req.session, null, 2))
//   if (req.user){
//     logger.info(`session: ${JSON.stringify(req.session.user)}`)
//   }
//   next();
// };



// export default [session, log]
export default session

