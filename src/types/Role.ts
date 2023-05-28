import { z } from 'zod'

export const RoleSchema = z.enum(['owner', 'admin', 'user', 'self']);

export type Role = z.infer<typeof RoleSchema>;

