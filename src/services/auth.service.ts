import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { User } from '../types/User'
import UserModel from '../models/user.model'

const verify = async (email: string, password: string): Promise<User> => {
  const user = await UserModel.findOne({email})

  if (user){
    if (await user.passwordMatches(password)){
      return user
    }
  }
  throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password')
}

export default {
  verify
}