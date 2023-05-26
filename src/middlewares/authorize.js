const logger = require("../utils/logger")
const userService = require('../services/user.service')
const ApiError = require('../utils/ApiError')
const { StatusCodes } = require('http-status-codes')
const permissions = require('../config/roles')

const authorize = (roles) => async (req, res, next) => {
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

module.exports = authorize