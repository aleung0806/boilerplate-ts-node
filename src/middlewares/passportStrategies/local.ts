import passport from 'passport';
import{ Strategy as LocalStrategy} from 'passport-local';
import authService from '../../services/auth.service';


const verify = async (email, password, done) => {
  const user = await authService.verifyEmailPassword(email, password)
  if (user) {
    return done(null, user);
  }
  return done(null, false)
  }

const strategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
  }, 
  verify
)

export default strategy





