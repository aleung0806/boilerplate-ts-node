Authentication: 
Authentication is handled by passport. Passports allows the use of multiple authentication strategies. 

Sessions are supported. 

Passport sessions: 

passport.serializeUser()
passport.deserializeUser()
Must be configured how to store/retrieve users from the session. For example, maybe only the userId is stored in the session cache and deserializing the user requires retrieving user data from db before storing it to req.session.passport.user.

app.use(passport.initialize()) 
Initializes passport for each request to the server.

app.use(session())
Reads the cookie from the request and retrieves the session data from the cache. 

passport.authenticate(strategy, options, callback )
The user is verified using the verify() supplied to the strategy.
If verified, the user stored to req.user.
req.isAuthenticated(), req.login() and req.logout() are also added.

Note that that this is all authenticate does! Logging in the user and sending a response must be done in the callback.  

Strategy(options, verify)
Strategy constructors take a verify function. Verify() will take different parameters depending on the strategy but will always include a callback.

There can be 3 returns: 
return cb(null, user) When the user is verified.
return cb(null, false) When the user is not verified.
return cb(error) When there is an error. NOT when, for example, db cannot find a user. 

Local Strategy
app.get('/login', passport.authenticate('local', options, callback))
Verify() takes the username and password from the request body. Aliases can be named. 

Google OAuth2.0 Strategy
app.get('/auth/google', passport.authenticate('google'))
app.get('/auth/google/callback', passport.authenticate('google', callback))
Two routes must be made - the first path will redirect to Google's login page. The second will receive Google's authentication results. 
Because the actual verification occurs on Google's end, verify() will contain logic, that, for example, reads Google's authentication results, creates a user for that profile if there isn't one already.

Session Strategy
app.use(passport.authenticate('session'))
This must be be called after your regular session middleware. You do not need to write a verify() - The built-in verify() essentially deserializes a user from the session provided by the express-session middleware if it exists. It essentially 'catches' requests to the server not authenticated explicitly by the other strategies but by the session token. 


And now an authorization middleware can determine if the user has the appropriate permissions. 




