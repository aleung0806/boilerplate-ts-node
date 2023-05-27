import Model from '../models/user.model';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { User } from '../types/User'

const create = async (user: User): Promise<User> => {
  if (await Model.emailExists(user.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is already taken.')
  }
  return Model.create(user)
}

const getAll = async (): Promise<Array<User>> => {
  const users = await Model.find({})
  if (users.length === 0 ){
    throw new ApiError(StatusCodes.NOT_FOUND, 'No users found.')
  }
  return users
}

const getById = async (id: string): Promise<User> => {
  const user = await Model.findById(id)
  if (!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')
  }
  return user
}

const updateById = async (id: string, update: User): Promise<User>=> {
  const user = await Model.findByIdAndUpdate(id, update, {new: true})
  if (user === null){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')
  }
  return user
}

const deleteById = async (id: string): Promise<void> => {
  const user = await Model.findByIdAndRemove(id)
  if (!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')
  }
  
}

const deleteAll = async (): Promise<void> => {
  const result = await Model.deleteMany({})
  if (result.deletedCount === 0){
    throw new ApiError(StatusCodes.NOT_FOUND, 'Users not found.')
  }
}

const updateRoleById = async (id: string, role: string): Promise<User | null> => {
  const user = await Model.findByIdAndUpdate(id, {role}, {new: true})
  if (!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')
  }
  return user
}

export default {
  create, 
  getAll,
  deleteAll,
  getById,
  updateById,
  deleteById,
  updateRoleById
}
