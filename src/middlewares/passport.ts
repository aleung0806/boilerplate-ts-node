import passport from 'passport';
import logger from '../utils/logger';
import localStrategy from './passportStrategies/local'
import googleStrategy from './passportStrategies/google'
import { User } from '../types/User'



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: User, done) {
  done(null, user);
});

passport.use(googleStrategy)
passport.use(localStrategy)

export default passport