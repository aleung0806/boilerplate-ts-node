import { User } from './User'

declare module 'express-session' {
  interface SessionData {
    user: User | null;
  }
}
