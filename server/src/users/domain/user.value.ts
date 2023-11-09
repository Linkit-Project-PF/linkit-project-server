import { type UserEntity } from './user.entity'
import { type Types } from 'mongoose'

export class UserValue implements UserEntity {
  // implements => implementa la interfaz
  _id?: Types.ObjectId | null
  name: string
  password?: string | null
  email: string
  role: string
  linkedin?: string | null
  cv?: string | null
  technologies?: string[]

  constructor (user: UserEntity) {
    this._id = user._id ?? undefined
    this.name = user.name
    this.password = user.password ?? undefined
    this.email = user.email
    this.role = user.role ?? 'user'
    this.linkedin = user.linkedin ?? undefined
    this.cv = user.cv ?? undefined
    this.technologies = user.technologies ?? []
  }
}
