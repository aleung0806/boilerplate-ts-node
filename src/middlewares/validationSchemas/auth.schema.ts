import { string } from 'joi';
import { z }from 'zod'
import { UserSchema } from '../../types/User'





const register =  z.object({
  params: z.object({}),
  body: UserSchema.pick(({
    email: true,
    username: true,
    password: true
  }))
})

const login =  z.object({
  params: z.object({}),
  body: UserSchema.pick(({
    email: true,
    password: true
  }))
})


const logout =  z.object({
  params: z.object({}),
  body: UserSchema.pick(({
    email: true,
    password: true
  }))
})

export default {
  register, login, logout
}