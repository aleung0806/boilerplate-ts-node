import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { User } from '../types/User'
import UserModel from '../models/user.model'

const verifyEmailPassword = async (email: string, password: string): Promise<User | ApiError> => {
  const user = await UserModel.findOne({email})
  if (!user){
    return new ApiError(401, 'Email not found.')
  }
  if (await user.passwordMatches(password)) {
    return user
  }
  return new ApiError(401, `Password doesn't match email.`)

  
}

export default {
  verifyEmailPassword
}