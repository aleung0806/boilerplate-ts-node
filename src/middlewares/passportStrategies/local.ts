import passport from 'passport';
import Local from 'passport-local';
import ApiError from '../../utils/ApiError';
import { verifyPassword }  from '../../services/auth.service';
import { User } from '../../types/User'


const verify: Local.VerifyFunction = async (email, password, done) => {
  try{
    const user: User | null = await verifyPassword(email, password)
    if (user){ return done(null, user) }
    return done(null, false)

  }catch(error){
    return done(error)
  }
}

const strategy = new Local.Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, 
  verify
)

export default strategy





