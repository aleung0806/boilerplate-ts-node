import Google from 'passport-google-oauth20'
import config from '../../config/config'

const strategy = new Google.Strategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  (_accessToken, _refreshToken, profile, done) => {
    // This function is called when the authentication is successful
    // You can customize it based on your application's needs
    return done(null, profile);
  }
)
export default strategy

