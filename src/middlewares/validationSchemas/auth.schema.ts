import { string } from 'joi';
import * as z from 'zod'

interface register {
  
}

const register = {
  body: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

const logout = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

export default {
  register, login, logout
}