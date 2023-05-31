import passport from 'passport';
import Local from 'passport-local';
import ApiError from 'src/utils/ApiError';
import authService from '../../services/auth.service';
import { User } from '../../types/User'


const verify: Local.VerifyFunction = async (email, password, done) => {
  const user: User | ApiError = await authService.verifyEmailPassword(email, password)
  if (user) {
    return done(null, user);
  }
  return done(null, false, { message: 'Incorrect username or password.' })
  }

const strategy = new Local.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
  }, 
  verify
)

export default strategy





