import Google from 'passport-google-oauth20'
import config from '../../config/config'
import Account from '../../models/account.model'
import User from '../../models/user.model'
import { findUserByAccount } from '../../services/auth.service'
import { ObjectId } from 'mongoose'
import logger from '../../utils/logger'

const verify = async ( _accessToken, _refreshToken, profile, done) => {
  try {
    const user: User | null = await findUserByAccount(profile)
    return done(null, user ? user : false)
  } catch (err){
    return done(err)
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

