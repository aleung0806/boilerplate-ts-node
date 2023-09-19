import Model from '../models/user.model';
import { User } from '../types/User'

import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { catchDbError } from '../utils/catchDbError'


export const customService = <Type>(Model) => {

  const create = async (resource: Type): Promise<Type> => {
    const created = await catchDbError(Model.create(resource))
    return created
  }

  const get = async (id: string): Promise<Type> => {
    const resource = await catchDbError(Model.findById(id))
    if (!resource){
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
    }
    return resource
  }

  const getAll = async (): Promise<Array<Type>> => {
    const resource = await Model.find({})
    if (resource.length === 0 ){
      throw new ApiError(StatusCodes.NOT_FOUND, 'None found.')
    }
    return resource
  }

  const update = async (id: string, update: Type): Promise<Type>=> {
    const resource = await Model.findByIdAndUpdate(id, update, {new: true})
    if (resource === null){
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
    }
    return resource
  }

  const remove = async (id: string): Promise<void> => {
    const resource = await Model.findByIdAndRemove(id)
    if (!resource){
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
    }
    
  }

  const removeAll = async (): Promise<void> => {
    const result = await Model.deleteMany({})
    if (result.deletedCount === 0){
      throw new ApiError(StatusCodes.NOT_FOUND, 'None found.')
    }
  }

  return {
    create, 
    get,
    getAll,
    update,
    remove,
    removeAll,
  }
  

}

