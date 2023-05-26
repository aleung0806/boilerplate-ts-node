const User = require('../models/user.model');
const logger = require('../utils/logger');
const { StatusCodes } = require('http-status-codes')
const ApiError = require('../utils/ApiError')

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
  return User.delete({id})
}

const deleteAll = async () => {
  return User.deleteMany({})
}

const updateRoleById = async (id, role) => {
  return User.findByIdAndUpdate(id, role, {new: true})
}

module.exports = {
  create,
  getById,
  getByEmail,
  getAll,
  updateById,
  deleteById,
  deleteAll,
};



