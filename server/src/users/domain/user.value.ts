import { randomUUID } from 'crypto'
import { type UserEntity } from './user.entity'

export class UserValue implements UserEntity {
  // implements => implementa la interfaz
  _id: string
  name: string
  password?: string | null
  email: string
  country: string
  phone: string
  role: string
  linkedin?: string | null
  cv?: string | null
  technologies?: string[]
  active: boolean

  constructor (user: UserEntity) {
    this._id = randomUUID()
    this.name = user.name
    this.password = user.password ?? undefined
    this.email = user.email
    this.country = user.country
    this.phone = user.phone
    this.role = user.role ?? 'user'
    this.linkedin = user.linkedin ?? undefined
    this.cv = user.cv ?? undefined
    this.technologies = user.technologies ?? []
    this.active = user.active ?? true
  }
}
