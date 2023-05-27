export interface User {
  id: string,
  username: string,
  email: string,
  roles: Array<string>
}

export interface UserDb extends User {
  password: string
}

