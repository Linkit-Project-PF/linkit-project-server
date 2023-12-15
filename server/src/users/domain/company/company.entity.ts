import { type Types } from 'mongoose'

export interface CompanyEntity {
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
}
