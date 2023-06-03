import logger from "../utils/logger"
import userService from '../services/user.service'
import ApiError from '../utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { Role } from '../types/Role'
import { Middleware } from '../types/Express'
import { Permissions } from '../types/Permissions'
// import permissions from '../config/roles'

export const authorize = (permissions: Permissions): Middleware => async (req, _res, next) => {
  if (!req.user){
    return next(new ApiError(StatusCodes.FORBIDDEN, 'You must be logged in.'));
  }

  const user = req.user
  if (permissions.roles){
    for (const role of permissions.roles){
      if(user.roles.includes(role)){
        logger.debug('Access granted: ' + role)
        return next();
      }
    }
  }
  if (permissions.attributes){
    for (const attribute of permissions.attributes){
      if(attribute === 'self'){
        if (user.id === req.params.id){
          logger.debug('Access granted: ' + attribute) 
          return next();
        }
      }
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


