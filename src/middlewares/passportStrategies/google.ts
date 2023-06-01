import Google from 'passport-google-oauth20'
import config from '../../config/config'
import Account from '../../models/account.model'
import User from '../../models/user.model'
import { findUserByAccount } from '../../services/auth.service'
import { ObjectId } from 'mongoose'
import logger from '../../utils/logger'


const verify = async (req, _accessToken, _refreshToken, profile, done) => {
  if (!req.user){
    try {
      const user: User | null = await findUserByAccount(profile)
      if (user) { return done(null, user)}
      return done(null, false)
    }catch (error) {
      return done(error)
    }
  }else{
    logger.error('User is already logged in')
    return done(null, false)
  }

}

const strategy = new Google.Strategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  verify

)
export default strategy

