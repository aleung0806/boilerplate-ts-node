const { StatusCodes } = require('http-status-codes')
const ApiError = require('../utils/ApiError')
const userService = require('./user.service')

const verify = async (email, password) => {
  const user = await userService.getByEmail(email)
  if (user){
    if (await user.passwordMatches(password)){
      return user
    }
  }
  throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password')
}

module.exports = {
  verify
}