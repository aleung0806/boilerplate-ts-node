const service = require("../services/user.service");

const { StatusCodes } = require('http-status-codes')
const logger = require('../utils/logger')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userService = require('../services/user.service')

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

module.exports = {
  getAll,
  create,
  deleteAll,
  getById,
  updateById,
  deleteById,
  updateRoleById,
};
