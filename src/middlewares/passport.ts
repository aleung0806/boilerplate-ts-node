import passport from 'passport';
import{ Strategy as LocalStrategy} from 'passport-local';
import authService from '../services/auth.service';
import logger from '../utils/logger';

const verify = async (email, password, done) => {
  const user = await authService.verifyEmailPassword(email, password)
  if (user) {
    return done(null, user);
  }
  return done(null, false)
  }

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, verify));



export default passport