import { type UserEntity } from './user.entity'

export class UserValue implements UserEntity {
  image?: string
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
    this.image = user.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
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
