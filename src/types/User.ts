import { RoleSchema } from './Role'
import { z } from 'zod'


export const UserDbSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: 'Invalid email address.'}),
  password: z.string().min(8, { message: 'Password must be 8 or more characters'}),
  username: z.string(),
  roles: z.array(RoleSchema)
})

export const UserSchema = UserDbSchema.omit({password: true})

export type UserDb = z.infer<typeof UserDbSchema>;
export type User = z.infer<typeof UserSchema>;

// export interface User {
//   id: string,
//   username: string,
//   email: string,
//   roles: Array<Role>
// }

// export interface UserDb extends User {
//   password: string
// }

