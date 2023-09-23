import { z } from 'zod'
import { ObjectId } from 'mongoose';
import { RoleSchema } from './Role'

export const ProjectSchema = z.object({
  id: z.custom<ObjectId>(),
  title: z.string(),
})
export type Project = z.infer<typeof ProjectSchema>;

export const ListSchema = z.object({
  id: z.custom<ObjectId>(),
  title: z.string(),
  projectId: z.custom<ObjectId>(),
  issueOrder: z.custom<ObjectId>().array(),
})
export type List = z.infer<typeof ListSchema>

export const IssueSchema = z.object({
  id: z.custom<ObjectId>(),
  title: z.string(),
  listId: z.custom<ObjectId>(),
  projectId: z.custom<ObjectId>(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  priority: z.string(),
  dateDue: z.date(),
  assigneeId: z.custom<ObjectId>(),
  creatorId: z.custom<ObjectId>(),
})
export type Issue = z.infer<typeof IssueSchema>;

export const ProjectRoleSchema = z.object({
  id: z.custom<ObjectId>(),
  projectId: z.custom<ObjectId>(),
  userId: z.custom<ObjectId>(),
  role: z.string()
})
export type ProjectRole = z.infer<typeof ProjectRoleSchema>;

export const CommentSchema = z.object({
  id: z.custom<ObjectId>(),
  projectId: z.custom<ObjectId>(),
  listId: z.custom<ObjectId>(),
  issueId: z.custom<ObjectId>(),
  userId: z.custom<ObjectId>(),
  comment: z.string()
})
export type Comment = z.infer<typeof CommentSchema>;

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

