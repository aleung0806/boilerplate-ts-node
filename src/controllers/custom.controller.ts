
import { StatusCodes } from 'http-status-codes'
import { Middleware } from '../types/Express'

export const customController = <_Type>(service) => {

  const create: Middleware = async (req, res, _next) => {
    const resource = await service.create(req.body)
    res.status(StatusCodes.CREATED).send(resource)
  };

  const get: Middleware = async (req, res, _next) => {
    const resource = await service.get(req.params.id)
    res.status(StatusCodes.OK).send(resource)
  };

  const getAll: Middleware = async (_req, res, _next) => {
    const resources = await service.getAll()
    res.status(StatusCodes.OK).send(resources)
  };

  const update: Middleware = async (req, res, _next) => {
    const resource = await service.update(req.params.id, req.body)
    res.status(StatusCodes.OK).send(resource)
  };

  const remove: Middleware = async (req, res, _next) => {
    await service.remove(req.params.id)
    res.status(StatusCodes.NO_CONTENT).send()
  }

  const removeAll: Middleware = async (_req, res, _next) => {
    await service.removeAll();
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