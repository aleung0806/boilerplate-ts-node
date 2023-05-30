import passport from 'passport';
import{ Strategy as LocalStrategy} from 'passport-local';
import authService from '../services/auth.service';
import logger from '../utils/logger';
import localStrategy from './passportStrategies/local'

const strategy = localStrategy

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(strategy)


export default passport