import service from "../services/user.service";

import { StatusCodes } from 'http-status-codes'
import logger from '../utils/logger'
import passport from 'passport';
// import LocalStrategy from 'passport-local.Strategy';
import { Middleware } from '../types/Middleware'
import userService from '../services/user.service'

const create: Middleware = async (req, res, _next) => {
  const user = await userService.create(req.body)
  res.status(StatusCodes.CREATED).send({user})
};

const getAll: Middleware = async (_req, res, _next) => {
  const users = await userService.getAll()
  res.status(StatusCodes.OK).send({users})
};

const deleteAll: Middleware = async (_req, res, _next) => {
  await userService.deleteAll();
  res.status(StatusCodes.NO_CONTENT).send();
};

const getById: Middleware = async (req, res, _next) => {
  const user = await userService.getById(req.params.id)
  res.status(StatusCodes.OK).send({user})
};

const updateById: Middleware = async (req, res, _next) => {
  const user = await userService.updateById(req.params.id, req.body)
  res.status(StatusCodes.OK).send({user})
};

const deleteById: Middleware = async (req, res, _next) => {
  await userService.deleteById(req.body)
  res.status(StatusCodes.NO_CONTENT).send()
};

const updateRoleById: Middleware = async (req, res, _next) => {
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
