import logger from "../utils/logger"
import userService from '../services/user.service'
import ApiError from '../utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { Role } from '../types/Role'
import { Middleware } from '../types/Express'
// import permissions from '../config/roles'

export const authorize = (roles: Array<Role>): Middleware => async (req, _res, next) => {
  if (!req.user){
    return next(new ApiError(StatusCodes.FORBIDDEN, 'You must be logged in.'));
  }
  const id = req.user.id
  const user = await userService.getById(id)

  // role-based match ['admin', 'user', 'owner', etc]
  for (const role of roles){
    if(user.roles.includes(role)){
      return next();
    }
  }

  // action-based match ['self', 'project', etc]
  if (roles.includes('self')){
    if (user.id === req.params.id){
      logger.debug('user is self')
      return next();
    }
  }
  
  return next(new ApiError(StatusCodes.FORBIDDEN, 'You do not have permission.'));
}

export const loggedOutOnly: Middleware = async (req, _res, next) => {
  if (req.user){
    return next(new ApiError(StatusCodes.FORBIDDEN, 'You must be logged out to log in or register an account.'));
  }else{
    return next()
  }
}

export const loggedInOnly: Middleware = async (req, _res, next) => {
  if (!req.user){
    return next(new ApiError(StatusCodes.FORBIDDEN, 'You must be logged in to log out.'));
  }else{
    return next()
  }
}


