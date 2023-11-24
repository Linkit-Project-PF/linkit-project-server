import { type CompanyEntity } from './company.entity'

export class CompanyValue implements CompanyEntity {
  airTableId?: string | null
  image?: string | undefined
  name: string
  country?: string | null
  phone?: string | null
  email: string
  password?: string | null | undefined
  role: string
  linkedin?: string | null | undefined
  active?: boolean | null | undefined
  jds: string[]

  constructor (company: CompanyEntity) {
    this.airTableId = company.airTableId ?? undefined
    this.image = company.image ?? 'DEFAULT_PROFILE_COMPANY_IMAGE'
    this.name = company.name
    this.password = company.password ?? undefined
    this.email = company.email
    this.country = company.country ?? undefined
    this.phone = company.phone ?? undefined
    this.role = company.role ?? 'company'
    this.linkedin = company.linkedin ?? undefined
    this.active = company.active ?? true
    this.jds = company.jds
  }
}
