import { type AdminEntity } from './admin.entity'

export class AdminValue implements AdminEntity {
  image?: string
  name: string
  email: string
  country?: string | null
  password?: string | null
  role: string
  active: boolean

  constructor (admin: AdminEntity) {
    this.image = admin.image ?? 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Callie'
    this.name = admin.name
    this.email = admin.email
    this.country = admin.country ?? undefined
    this.password = admin.password ?? undefined
    this.role = admin.role ?? 'admin'
    this.active = admin.active ?? true
  }
}
