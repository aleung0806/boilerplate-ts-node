import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { Middleware } from '../types/Middleware'
import { ZodType } from 'zod'
import { fromZodError } from 'zod-validation-error';

// import { z, ZodType, ZodErrorMap, ZodIssue, ZodIssueCode } from "zod";

// const customErrorMap: ZodErrorMap = (_issue: Omit<ZodIssue, "message">, ctx: { defaultError: string; data: any}) => {
//   // if (issue.code === ZodIssueCode.invalid_type) {
//   //   if (issue.expected === "string") {
//   //     return { message: "bad type!" };
//   //   }
//   // }

//   return { message: ctx.defaultError };
// };

// z.setErrorMap(customErrorMap);

const validate = (schema: ZodType<any>): Middleware => async (req, _res, next) => {
  const validation = await schema.safeParseAsync(req)

  if (!validation.success){
    const error = fromZodError(validation.error)
    return next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }

  return next();
};

export default validate