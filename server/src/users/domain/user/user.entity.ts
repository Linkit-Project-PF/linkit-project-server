import { type Types } from 'mongoose'

export interface UserEntity {
  airTableId?: string | null
  image?: string | null
  firstName: string
  lastName: string
  email: string
  country?: string | null
  linkedin?: string | null
  cv?: string | null
  englishLevel?: string | null
  role: string
  technologies?: string[]
  active: boolean
  registeredDate: Date
}

export interface MongoUser extends UserEntity {
  _id: Types.ObjectId
}
