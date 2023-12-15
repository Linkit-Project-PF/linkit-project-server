import { type Types } from 'mongoose'
import { type CompanyEntity } from './company.entity'

export class CompanyValue implements CompanyEntity {
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
  jds: Types.ObjectId[]
  registeredDate: Date
  password?: string | null

  constructor (company: CompanyEntity) {
    this.airTableId = company.airTableId ?? undefined
    this.image = company.image ?? undefined
    this.companyName = company.companyName
    this.password = company.password ?? undefined
    this.email = company.email
    this.country = company.country ?? undefined
    this.role = company.role ?? 'company'
    this.linkedin = company.linkedin ?? undefined
    this.active = company.active ?? true
    this.interested = company.interested ?? undefined
    this.registeredDate = company.registeredDate
    this.jds = company.jds
  }
}
