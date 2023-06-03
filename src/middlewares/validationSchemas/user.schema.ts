import { string } from 'joi'
import { zipObject } from 'lodash'
import { z } from 'zod'
import { UserSchema } from '../../types/User'


const create = z.object({
  params: z.object({
    id: z.string()
  }),
  body: UserSchema
})

const getAll = z.object({
  params: z.object({}),
  body: z.object({})
})

const deleteAll = z.object({
  params: z.object({}),
  body: z.object({})
})

const getById = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({})
})

const updateById = z.object({
  params: z.object({
    id: z.string()
  }),
  body: UserSchema
})

const deleteById = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({})
})

const updateRoleById = z.object({
  params: z.object({
    id: z.string()
  }),
  body: UserSchema.pick({roles: true})
})


export default {
  create, 
  getAll,
  deleteAll,
  getById,
  updateById,
  deleteById,
  updateRoleById
}
