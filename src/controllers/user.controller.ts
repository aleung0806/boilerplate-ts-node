
import { StatusCodes } from 'http-status-codes'

import { Middleware } from '../types/Express'
import userService from '../services/user.service'

const create: Middleware = async (req, res, _next) => {
  const user = await userService.create(req.body)
  res.status(StatusCodes.CREATED).send({user})
};

const getAll: Middleware = async (_req, res, _next) => {
  const users = await userService.getAll()
  res.status(StatusCodes.OK).send(users)
};

const removeAll: Middleware = async (_req, res, _next) => {
  await userService.removeAll();
  res.status(StatusCodes.NO_CONTENT).send();
};

const get: Middleware = async (req, res, _next) => {
  const user = await userService.get(req.params.id)
  res.status(StatusCodes.OK).send(user)
};

const update: Middleware = async (req, res, _next) => {
  const user = await userService.update(req.params.id, req.body)
  res.status(StatusCodes.OK).send(user)
};

const remove: Middleware = async (req, res, _next) => {
  await userService.remove(req.params.id)
  res.status(StatusCodes.NO_CONTENT).send()
};

export default {
  create, 
  getAll,
  removeAll,
  get,
  update,
  remove,
}
