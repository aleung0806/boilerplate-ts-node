import logger from "../utils/logger"
import userService from '../services/user.service'
import ApiError from '../utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { Role } from '../types/Role'
import { Middleware } from '../types/Middleware'
// import permissions from '../config/roles'

const authorize = (roles: Array<Role>): Middleware => async (req, _res, next) => {
  if (!req.session.user){
    return next(new ApiError(StatusCodes.FORBIDDEN, 'You must be logged in.'));
  }
  const id = req.session.user.id
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

export default authorize