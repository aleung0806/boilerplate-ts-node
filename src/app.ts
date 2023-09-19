import express from "express";
require('express-async-errors');

import helmet from "helmet";
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import errorHandler from './middlewares/error'
import morgan from './middlewares/morgan'
import sessionHandler from './middlewares/session'
import passport from './middlewares/passport'
import expressSession from "express-session";
import config from './config/config'
import { redisStore } from './db/redis';
import authRouter from "./routes/auth.route";
import userRouter from './routes/user.route';
// import roleRouter from './routes/roles.route';
import docsRouter from './routes/docs.route';
// import testRouter from "./routes/test.route";
const cookieParser = require('cookie-parser')

import {projectRouter} from './routes/jira.route'


const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
)

app.use(morgan)
app.use(passport.initialize());
app.use(expressSession({
  store: redisStore,
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false, 
    httpOnly: true, 
    maxAge: 1000 * 60 * 30
    },
}))
app.use(passport.session());

app.use(authRouter);
app.use(userRouter);

app.use(projectRouter);
// app.use(ListRouter);
// app.use(IssueRouter);



app.use(docsRouter);
app.use(errorHandler)

export default app;
