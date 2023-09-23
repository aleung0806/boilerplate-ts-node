// import authService from "../services/auth.service";
import userService from "../services/user.service";
import { StatusCodes } from 'http-status-codes'
import logger from '../utils/logger'

import { Request, Response, NextFunction} from 'express'
import { Middleware } from "src/types/Express";
import ApiError from "../utils/ApiError";
import passport from '../middlewares/passport'


export const login: Middleware = async (req, res, next) => {
  passport.authenticate('local', (err, user, _info) => {
    if (err) { return next(err); }
    if (!user) { 
      return res.sendStatus(401)
    }
    req.login(user, () => {
      res.status(200).send(user)
    })
  })(req, res, next)
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
  console.log('registering', req.body)
  const user = await userService.create(req.body)
  const userInfo = await userService.get(user.id)

  req.login(userInfo, () => {
    res.status(StatusCodes.CREATED).send(userInfo)
  })
};


export const verify: Middleware = async (req, res, _next) => {
  if (req.isAuthenticated()){
    return res.status(200).send(req.user)
  }
  return res.sendStatus(204)

};

export const refresh: Middleware = async (req, res, _next) => {
  if (req.isAuthenticated()){
    const updatedUser = await userService.get(req.user.id)
    req.login(updatedUser, () => {
      res.status(204).send(updatedUser)
    })
  }
  //return res.sendStatus(204)

};



export default {

  register,
  login,
  logout,
  verify,
  refresh

}