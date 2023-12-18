import { type Types } from 'mongoose'

export interface permissions {
  get: string[]
  create: string[]
  update: string[]
  delete: string[]
  special: string[]
}

export interface AdminEntity {
  image?: string | null
  firstName: string
  lastName: string
  email: string
  country?: string | null
  password?: string | null
  role?: string | null
  active?: boolean | null
  createdDate: Date
  recruiterOf: Types.ObjectId[]
  permissions?: permissions | null
}
