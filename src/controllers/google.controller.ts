import { Middleware } from "src/types/Express"
import passport from '../middlewares/passport'

export const login: Middleware = async (req, res, next) => {
  passport.authenticate('google', { scope: [ 'email', 'profile' ] })(req, res, next);
}

export const callback: Middleware = async (req, res, next) => {
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:3000/login',
    successRedirect: 'http://localhost:3000/',
  })
  //  (err, user, _info) => {
  //   if (err) { return next(err); }
  //   if (!user) { 
  //     return res.sendStatus(200)
  //   }
  //   req.login(user, () => {
  //     res.status(200).send(user)
  //   })
  (req, res, next)
};

export const success: Middleware = async (req, res, _next) => {
  if (req.user){
    res.status(200).send(req.user)
  }else{
    res.status(200).send('No User')
  }
};

export const failure: Middleware = async (req, res, _next) => {
  if (req.user){
    res.status(200).send(req.user)
  }else{
    res.status(200).send('No User')
  }
};


export default {
  login,
  callback,
  success,
  failure

}