import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { User } from '../types/User'
import UserModel from '../models/user.model'

const verifyEmailPassword = async (email: string, password: string): Promise<User | null> => {
  const user = await UserModel.findOne({email})
  if (user){
    if (await user.passwordMatches(password)) {
      return user
    }
  }
  return null
}

export default {
  verifyEmailPassword
}