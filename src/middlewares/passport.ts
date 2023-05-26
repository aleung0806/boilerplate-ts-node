import passport from 'passport';
import LocalStrategy from 'passport-local'.Strategy;
import userService from '../services/user.service';
import logger from '../utils/logger';

const verify = async (email, password, done) => {
  const user = await userService.getByEmail(email)
  if (user) {
    if (await user.passwordMatches(password)){
      logger.info('verified')
      return done(null, user);
    }
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



module.exports = passport
