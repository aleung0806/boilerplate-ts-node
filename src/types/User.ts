export interface User {
  username: string,
  email: string,
  roles: Array<string>
}

export interface UserDb extends User {
  password: string
}

