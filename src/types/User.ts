import { RoleSchema } from './Role'
import { z } from 'zod'
import { ObjectId } from 'mongoose';


export const UserDocumentSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: 'Invalid email address.'}),
  password: z.string().min(8, { message: 'Password must be 8 or more characters'}),
  username: z.string(),
  roles: z.array(RoleSchema),
  favoriteProject: z.custom<ObjectId>(),
})

export const UserSchema = UserDocumentSchema.omit({password: true})

export type User = z.infer<typeof UserSchema>;
export type UserDocument = z.infer<typeof UserDocumentSchema>;

// export interface User {
//   id: string,
//   username: string,
//   email: string,
//   roles: Array<Role>
// }

// export interface UserDb extends User {
//   password: string
// }

