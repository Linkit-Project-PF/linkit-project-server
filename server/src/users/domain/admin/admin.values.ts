import { type permissions, type AdminEntity } from './admin.entity'

export class AdminValue implements AdminEntity {
  firebaseId?: string | null
  image?: string | null
  firstName: string
  lastName: string
  email: string
  country?: string | null
  password?: string | null
  role?: string | null
  active?: boolean | null
  createdDate: Date
  permissions?: permissions | null
  provider: string

  constructor (admin: AdminEntity) {
    this.firebaseId = admin.firebaseId ?? undefined
    this.image = admin.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
    this.firstName = admin.firstName
    this.lastName = admin.lastName
    this.email = admin.email
    this.country = admin.country ?? undefined
    this.password = admin.password ?? undefined
    this.role = admin.role ?? 'admin'
    this.active = admin.active ?? true
    this.createdDate = admin.createdDate
    this.permissions = admin.permissions
    this.provider = admin.provider
  }
}
