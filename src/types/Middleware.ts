import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError'

export type Middleware = (req: Request, res: Response, next: NextFunction) => any



export type ErrorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => any