// import authService from "../services/auth.service";
import userService from "../services/user.service";
import { StatusCodes } from 'http-status-codes'
import logger from '../utils/logger'

import { Request, Response, NextFunction} from 'express'
import { Middleware } from "src/types/Express";
import ApiError from "../utils/ApiError";
import passport from '../middlewares/passport'



export const google: Middleware = async (req, res, next) => {
  passport.authenticate('google', { scope: [ 'email', 'profile' ] })(req, res, next);
};

export const googleCallback: Middleware = async (req, res, next) => {
  passport.authenticate('google', 
    {
      session: true,
      successRedirect: '/v1/homePage',
      failureRedirect: '/v1/loginPage',
      failureMessage: 'true'
    }
  )(req, res, next);
};

export const login: Middleware = async (req, res, next) => {
  passport.authenticate('google', 
    {
      session: true,
      successRedirect: '/v1/homePage',
      failureRedirect: '/v1/loginPage',
      failureMessage: 'true'
    }
  )(req, res, next);
};


export const logout: Middleware = async (req, res, next) => {
  if (req.session){
    req.session.destroy((error) => {
      if (error) {
        return next(new ApiError(StatusCodes.FORBIDDEN, 'You must be logged in.'));
      }
    })
  }
  res.status(StatusCodes.OK).send('user is logged out')
};

export const register: Middleware = async (req, res, _next) => {
  const user = await userService.create(req.body)
  res.status(StatusCodes.CREATED).send({user})
};


export const verify: Middleware = async (req, res, _next) => {
  req.session.test = 'testUser'
  res.status(200).send('Testing')
};

export const homePage: Middleware = async (req, res, _next) => {
  if (req.user){
    res.status(200).send(req.user)
  }else{
    res.status(200).send('No User')
  }
};

export const loginPage: Middleware = async (req, res, _next) => {
  if (req.user){
    res.status(200).send(req.user)
  }else{
    res.status(200).send('No User')
  }
};


// const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).send("fields are missing");
//   }

//   try {
//     const user = await service.login(email, password);

//     req.session.regenerate((err) => next(err));
//     req.session.user = user;
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).send("incorrect email or password");
//   }
// };

// const logout = async (req, res, next) => {
//   req.session.destroy((err) => next(err));
//   res.send("you are now logged out");
// };

// const verify = async (req, res, next) => {
//   console.log(req.session);
//   const user = req.session.user;
//   if (user !== null) {
//     console.log(user);
//     res.send(user);
//   } else {
//     res.send("not logged in");
//   }
// };

export default {
  homePage,
  loginPage,
  register,
  login,
  logout,
  verify,
  google,
  googleCallback
}