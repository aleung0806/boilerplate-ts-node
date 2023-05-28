import { z } from 'zod'


const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: 'Invalid email address.'}),
  password: z.string().min(8, { message: 'Password must be 8 or more characters'}),
  username: z.string(),
  roles: z.array(z.string())
})

const schema = z.object({
  params: z.undefined(),
  body: UserSchema.pick(({
    email: true,
    username: true,
    password: true
  }))
})

const testReq = {
  params: {},
  body: {
    email: 'em@mail.com'
  }
}
const request = schema.parse(testReq)
console.log(request)