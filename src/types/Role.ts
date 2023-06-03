import { z } from 'zod'

export const RoleSchema = z.enum(['owner', 'admin', 'user']);

export type Role = z.infer<typeof RoleSchema>;

