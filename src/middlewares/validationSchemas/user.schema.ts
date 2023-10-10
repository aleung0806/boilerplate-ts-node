import { string } from 'joi'
import { zipObject } from 'lodash'
import { z } from 'zod'
import { PartialUserSchema, UserDocumentSchema, UserSchema } from '../../types/User'

const create = z.object({
  params: z.object({}),
  body: UserDocumentSchema.pick(({
    email: true,
    username: true,
    password: true
  }))
})

const get = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({})
})

const getAll = z.object({
  params: z.object({}),
  body: z.object({})
})

const remove = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({})
})

const removeAll = z.object({
  params: z.object({}),
  body: z.object({})
})

const update = z.object({
  params: z.object({
    id: z.string()
  }),
  body: PartialUserSchema
})



// const updateRoleById = z.object({
//   params: z.object({
//     id: z.string()
//   }),
//   body: UserSchema.pick({roles: true})
// })


export default {
  create, 
  get,
  getAll,
  update,
  remove,
  removeAll,
  // updateRoleById
}
