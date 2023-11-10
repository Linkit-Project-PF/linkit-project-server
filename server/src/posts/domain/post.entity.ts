import { type Types } from 'mongoose'

export interface PostEntity {
  _id?: Types.ObjectId | null
  title: string
  image?: string | null
  description: string
  input: string
}
