import { type CompanyEntity } from './company.entity'

export class CompanyValue implements CompanyEntity {
  airTableId?: string | null
  image?: string
  companyName: string
  repName?: string | null
  country?: string | null
  email: string
  password?: string | null
  role: string
  linkedin?: string | null
  active?: boolean | null
  jds: string[]

  constructor (company: CompanyEntity) {
    this.airTableId = company.airTableId ?? undefined
    this.image = company.image ?? 'DEFAULT_PROFILE_COMPANY_IMAGE'
    this.companyName = company.companyName
    this.password = company.password ?? undefined
    this.email = company.email
    this.country = company.country ?? undefined
    this.role = company.role ?? 'company'
    this.linkedin = company.linkedin ?? undefined
    this.active = company.active ?? true
    this.jds = company.jds
  }
}
