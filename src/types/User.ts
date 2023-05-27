import { Role } from '../types/Role'

export interface User {
  id: string,
  username: string,
  email: string,
  roles: Array<Role>
}

export interface UserDb extends User {
  password: string
}

