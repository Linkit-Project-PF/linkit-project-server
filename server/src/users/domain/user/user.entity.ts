import { type Types } from 'mongoose'
import { type cv } from '../../../interfaces'

export interface UserEntity {
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
}

export interface MongoUser extends UserEntity {
  _id: Types.ObjectId
}
