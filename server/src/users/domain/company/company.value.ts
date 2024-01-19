import { type CompanyEntity } from './company.entity'

export class CompanyValue implements CompanyEntity {
  firebaseId?: string | null
  airTableId?: string | null
  image?: string
  companyName: string
  repName?: string | null
  email: string
  country?: string | null
  linkedin?: string | null
  role: string
  interested?: string | null
  active?: boolean | null
  createdDate: Date
  provider: string

  constructor (company: CompanyEntity) {
    this.firebaseId = company.firebaseId ?? undefined
    this.airTableId = company.airTableId ?? undefined
    this.image = company.image ?? undefined
    this.companyName = company.companyName
    this.email = company.email
    this.country = company.country ?? undefined
    this.role = company.role ?? 'company'
    this.linkedin = company.linkedin ?? undefined
    this.active = company.active ?? false
    this.interested = company.interested ?? undefined
    this.createdDate = company.createdDate
    this.provider = company.provider
  }
}
