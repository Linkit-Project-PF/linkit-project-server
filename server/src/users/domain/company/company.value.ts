import { type CompanyEntity } from './company.entity'

export class CompanyValue implements CompanyEntity {
  image?: string | undefined
  name: string
  country: string
  phone: string
  email: string
  password?: string | null | undefined
  role?: string | null | undefined
  linkedin?: string | null | undefined
  active?: boolean | null | undefined

  constructor (company: CompanyEntity) {
    this.image = company.image ?? 'DEFAULT_PROFILE_COMPANY_IMAGE'
    this.name = company.name
    this.password = company.password ?? undefined
    this.email = company.email
    this.country = company.country
    this.phone = company.phone
    this.role = company.role ?? 'company'
    this.linkedin = company.linkedin ?? undefined
    this.active = company.active ?? true
  }
}
