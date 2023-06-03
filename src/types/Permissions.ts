type Role = 'owner'| 'admin' | 'user'
type Attribute = 'self' | 'project'

export interface Permissions {
  roles?: Array<Role>,
  attributes?: Array<Attribute>
}


