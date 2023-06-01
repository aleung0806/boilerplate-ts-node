import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { User } from '../types/User'
import UserModel from '../models/user.model'
import AccountModel from '../models/account.model'
import logger from '../utils/logger'

export const verifyPassword = async (email: string, password: string): Promise<User | null> => {
  const user = await UserModel.findOne({email})
  if (user){
    if (await user.passwordMatches(password)) {
      return user
    }
  }
  return null
}

export const findUserByAccount = async (profile): Promise<User | null> => {
  const account =  await AccountModel.findOne({provider: profile.provider, providerId: profile.id})
  if (account){
    const user: User | null = await UserModel.findById(account.userId)
    return user
  }else {
    const user: User = await UserModel.create({email: profile._json.email, username: profile.displayName, password: 'password'})
    await AccountModel.create({provider: 'google', providerId: profile.id, userId: user.id})
    return user;
  } 
}
