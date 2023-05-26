import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import userService from './user.service'

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