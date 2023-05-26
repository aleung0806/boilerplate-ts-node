import User from '../models/user.model';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'

const create = async (user) => {
  if (await User.emailExists(user.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is already taken.')
  }
  return User.create(user)
}

const getAll = async () => {
  return await User.find({})
}

const getById = async (id) => {
  const user = await User.findById(id)
  if (!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }
  return user
}

const getByEmail = async (email) => {
  return User.findOne({email})
}

const updateById = async (id, update) => {
  return User.findByIdAndUpdate(id, update, {new: true})
}

const deleteById = async (id) => {
  return User.deleteOne({id})
}

const deleteAll = async () => {
  return User.deleteMany({})
}

const updateRoleById = async (id, role) => {
  return User.findByIdAndUpdate(id, role, {new: true})
}

export default {
  create, 
  getAll,
  deleteAll,
  getById,
  getByEmail,
  updateById,
  deleteById,
  updateRoleById
}
