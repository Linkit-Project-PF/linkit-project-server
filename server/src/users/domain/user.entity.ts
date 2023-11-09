import { type Types } from 'mongoose'

export interface UserEntity {
  _id?: Types.ObjectId | null
  name: string
  email: string
  password?: string | null //* Important to decide If we keep It, otherwise we need to create another interface */
  role?: string | null
  linkedin?: string | null
  cv?: string | null
  technologies?: string[]
}
