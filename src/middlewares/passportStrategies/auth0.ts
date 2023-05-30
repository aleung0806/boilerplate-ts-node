const Auth0Strategy = require('passport-auth0');
const strategy = new Auth0Strategy({
     // ...
     state: false
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // ...
  }
);