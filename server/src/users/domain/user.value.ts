//* clase encargada de mapear lo datos

import { randomUUID } from 'crypto'
import { type UserEntity } from './user.entity'

export class UserValue implements UserEntity {
  // implements => implementa la interfaz
  uuid: string
  username: string
  password?: string
  email: string
  role: string

  constructor (user: UserEntity) {
    this.uuid = user.uuid || randomUUID()
    this.username = user.username
    this.password = user.password ?? undefined
    this.email = user.email
    this.role = user.role ?? 'user'
  }
}
