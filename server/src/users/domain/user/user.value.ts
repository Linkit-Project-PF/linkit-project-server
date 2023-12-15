import { type UserEntity } from './user.entity'

export class UserValue implements UserEntity {
  airTableId?: string | null
  image?: string
  firstName: string
  lastName: string
  email: string
  country?: string | null
  linkedin?: string | null
  cv?: string | null
  englishLevel?: string | null
  role: string
  technologies?: string[]
  active?: boolean | null
  postulations: string[]
  registeredDate: Date
  password?: string | null

  constructor (user: UserEntity) {
    this.airTableId = user.airTableId ?? undefined
    this.image = user.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.country = user.country ?? undefined
    this.role = user.role ?? 'user'
    this.linkedin = user.linkedin ?? undefined
    this.cv = user.cv ?? undefined
    this.registeredDate = user.registeredDate
    this.technologies = user.technologies ?? []
    this.active = user.active ?? true
    this.postulations = user.postulations
    this.password = user.password ?? undefined
  }
}
