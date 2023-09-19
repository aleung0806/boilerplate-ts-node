import { z } from 'zod'
import { ObjectId } from 'mongoose';

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


