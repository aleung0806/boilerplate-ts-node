import UserModel from '../models/user.model';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { User } from '../types/User'
import { catchDbError } from '../utils/catchDbError'

const create = async (user: User): Promise<User> => {
  if (await UserModel.emailExists(user.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is already taken.')
  }
  const createdUser = await UserModel.create(user)

  return createdUser
}

const getAll = async (): Promise<Array<User>> => {
  const users = await UserModel.find({})
  if (users.length === 0 ){
    throw new ApiError(StatusCodes.NOT_FOUND, 'No users found.')
  }
  return users
}

const get = async (id: string): Promise<User> => {

  const user = await catchDbError(UserModel.findById(id))

  if (!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')
  }

  return user
}

const update = async (id: string, update: User): Promise<User>=> {
  const user = await UserModel.findByIdAndUpdate(id, update, {new: true})
  if (user === null){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')
  }
  return user
}

const remove = async (id: string): Promise<void> => {
  const user = await UserModel.findByIdAndRemove(id)
  if (!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')
  }
  
}

const removeAll = async (): Promise<void> => {
  const result = await UserModel.deleteMany({})
  if (result.deletedCount === 0){
    throw new ApiError(StatusCodes.NOT_FOUND, 'Users not found.')
  }
}

export default {
  create, 
  getAll,
  removeAll,
  get,
  update,
  remove,
}
