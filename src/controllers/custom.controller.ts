
import { StatusCodes } from 'http-status-codes'
import { Middleware } from '../types/Express'

export const customController = <_Type>(Service) => {

  const create: Middleware = async (req, res, _next) => {
    const resource = await Service.create(req.body)
    res.status(StatusCodes.CREATED).send({resource})
  };

  const get: Middleware = async (req, res, _next) => {
    const resource = await Service.get(req.params.id)
    res.status(StatusCodes.OK).send({resource})
  };

  const getAll: Middleware = async (_req, res, _next) => {
    const resources = await Service.getAll()
    res.status(StatusCodes.OK).send({resources})
  };

  const update: Middleware = async (req, res, _next) => {
    const resource = await Service.update(req.params.id, req.body)
    res.status(StatusCodes.OK).send({resource})
  };

  const remove: Middleware = async (req, res, _next) => {
    await Service.remove(req.params.id)
    res.status(StatusCodes.NO_CONTENT).send()
  }

  const removeAll: Middleware = async (_req, res, _next) => {
    await Service.removeAll();
    res.status(StatusCodes.NO_CONTENT).send();
  };

  return {
    create, 
    get, 
    getAll,
    update,
    remove,
    removeAll
  }

}