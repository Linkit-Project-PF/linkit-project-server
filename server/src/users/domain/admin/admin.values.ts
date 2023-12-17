import { type Types } from 'mongoose'
import { type permissions, type AdminEntity } from './admin.entity'

export class AdminValue implements AdminEntity {
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
  permissions: permissions

  constructor (admin: AdminEntity) {
    this.image = admin.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
    this.firstName = admin.firstName
    this.lastName = admin.lastName
    this.email = admin.email
    this.country = admin.country ?? undefined
    this.password = admin.password ?? undefined
    this.role = admin.role ?? 'admin'
    this.active = admin.active ?? true
    this.createdDate = admin.createdDate
    this.recruiterOf = admin.recruiterOf
    this.permissions = admin.permissions
  }
}
