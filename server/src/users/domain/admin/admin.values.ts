import { type AdminEntity } from './admin.entity'

export class AdminValue implements AdminEntity {
  image?: string
  name: string
  email: string
  phone: string
  country: string
  linkedin?: string | null
  password?: string
  role: string
  active: boolean

  constructor (admin: AdminEntity) {
    this.image = admin.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
    this.name = admin.name
    this.email = admin.email
    this.phone = admin.phone
    this.country = admin.country
    this.linkedin = admin.linkedin ?? undefined
    this.password = admin.password ?? 'secret'
    this.role = admin.role ?? 'admin'
    this.active = admin.active ?? true
  }
}
