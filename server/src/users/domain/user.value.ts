//* clase encargada de mapear lo datos que van a ser representacion de la entidad

import { randomUUID } from 'crypto'
import { type UserEntity } from './user.entity'

export class UserValue implements UserEntity { // implements => implementa la interfaz
  uuid: string
  username: string
  password: string
  email: string
  role: string
  permissions: string[]

  constructor (user: UserEntity) {
    this.uuid = randomUUID()
    this.username = user.username
    this.password = user.password
    this.email = user.email
    this.role = user.role ?? 'user'
    this.permissions = user.permissions
  }
}
