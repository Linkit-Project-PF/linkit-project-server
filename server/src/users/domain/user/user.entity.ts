import { type Types } from 'mongoose'

export interface UserEntity {
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
  active: boolean
  postulations: Types.ObjectId[]
  registeredDate: Date
}

export interface MongoUser extends UserEntity {
  _id: Types.ObjectId
}
