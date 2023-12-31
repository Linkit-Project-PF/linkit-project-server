import { type cv } from '../../../interfaces'
import { type UserEntity } from './user.entity'

export class UserValue implements UserEntity {
  firebaseId?: string | null
  airTableId?: string | null
  image?: string | null
  firstName: string
  lastName: string
  email: string
  password?: string
  country?: string | null
  linkedin?: string | null
  cv?: cv | null
  englishLevel?: string | null
  role: string
  technologies: string[]
  active: boolean
  createdDate: Date
  postulations: string[]
  provider: string

  constructor (user: UserEntity) {
    this.firebaseId = user.firebaseId ?? undefined
    this.airTableId = user.airTableId ?? undefined
    this.image = user.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.password = user.password ?? undefined
    this.country = user.country ?? undefined
    this.role = user.role ?? 'user'
    this.linkedin = user.linkedin ?? undefined
    this.cv = { fileName: user.cv?.fileName ?? undefined, cloudinaryId: user.cv?.cloudinaryId ?? undefined }
    this.createdDate = user.createdDate
    this.technologies = user.technologies
    this.active = user.active
    this.postulations = user.postulations
    this.provider = user.provider
  }
}
