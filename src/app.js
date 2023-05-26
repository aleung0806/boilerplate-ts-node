const express = require("express");
require('express-async-errors');

const helmet = require("helmet");
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');

const errorHandler = require('./middlewares/error')
const morgan = require('./middlewares/morgan')
const sessionHandler = require('./middlewares/session')

const authRouter = require("./routes/v1/auth.route");
const userRouter = require('./routes/v1/user.route');
const roleRouter = require('./routes/v1/roles.route');
const docsRouter = require('./routes/v1/docs.route');
const testRouter = require("./routes/v1/test.route");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.options('*', cors());

app.use(morgan)
app.use(sessionHandler)
// app.use(passport.initialize());
// app.use(passport.session());
// app.post('/v1/passport-login', passport.authenticate('local'));

app.use('/v1', authRouter);
app.use('/v1', userRouter);
app.use('/v1', roleRouter);
app.use('/v1', docsRouter);
app.use('/v1', testRouter);

app.use(errorHandler)


module.exports = app;
