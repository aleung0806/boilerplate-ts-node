import service from "../services/user.service";

import { StatusCodes } from 'http-status-codes'
import logger from '../utils/logger'
import passport from 'passport';
// import LocalStrategy from 'passport-local.Strategy';

import userService from '../services/user.service'

const create = async (req, res, next) => {
  const user = await userService.create(req.body)
  res.status(StatusCodes.CREATED).send({user})
};

const getAll = async (req, res, next) => {
  const users = await userService.getAll()
  res.status(StatusCodes.OK).send({users})
};

const deleteAll = async (req, res, next) => {
  await userService.deleteAll();
  res.status(StatusCodes.NO_CONTENT).send();
};

const getById = async (req, res, next) => {
  logger.debug(`req.values: ${JSON.stringify(req.values, null, 2)}`)
  const user = await userService.getById(req.params.id)
  res.status(StatusCodes.OK).send({user})
};

const updateById = async (req, res, next) => {
  const user = await userService.updateById(req.params.id, req.body)
  res.status(StatusCodes.OK).send({user})
};

const deleteById = async (req, res, next) => {
  await userService.deleteById(req.body)
  res.status(StatusCodes.NO_CONTENT).send()
};

const updateRoleById = async (req, res, next) => {
  const user = await userService.updateRoleById(req.params.id, req.body)
  res.status(StatusCodes.OK).send({user})
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
