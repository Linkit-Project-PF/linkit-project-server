import { type postulations, type UserEntity } from './user.entity'

export class UserValue implements UserEntity {
  airTableId?: string | null
  image?: string
  name: string
  password?: string | null
  email: string
  country?: string | null
  phone?: string | null
  role: string
  linkedin?: string | null
  cv?: string | null
  technologies?: string[]
  active: boolean
  postulations?: postulations[]
  userStatus?: string | null
  internStatus?: string | null

  constructor (user: UserEntity) {
    this.airTableId = user.airTableId ?? undefined
    this.image = user.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
    this.name = user.name
    this.password = user.password ?? undefined
    this.email = user.email
    this.country = user.country ?? undefined
    this.phone = user.phone ?? undefined
    this.role = user.role ?? 'user'
    this.linkedin = user.linkedin ?? undefined
    this.cv = user.cv ?? undefined
    this.technologies = user.technologies ?? []
    this.active = user.active ?? true
    this.postulations = user.postulations ?? []
    this.userStatus = user.userStatus ?? undefined
    this.internStatus = user.internStatus ?? undefined
  }
}
