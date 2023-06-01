import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError'
import { User as AppUser }from './User'

declare global { 
  namespace Express { 
    interface User extends AppUser { 
    } 
  }
}
export type Middleware = (req: Request, res: Response, next: NextFunction) => void

export type ErrorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => void