import Google from 'passport-google-oauth20'
import config from '../../config/config'

const strategy = new Google.Strategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
    
  },
  (_accessToken, _refreshToken, profile, done) => {
    console.log(JSON.stringify(profile, null, 2))
    return done(null, profile);
  }
)
export default strategy

