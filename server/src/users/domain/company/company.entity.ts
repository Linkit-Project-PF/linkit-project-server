import { type Types } from 'mongoose'

export interface CompanyEntity {
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
  registeredDate: Date
}

export interface MongoCompany extends CompanyEntity {
  _id: Types.ObjectId
}
