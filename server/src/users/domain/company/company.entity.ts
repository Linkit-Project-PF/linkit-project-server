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
  jds: string[]
  registeredDate: Date
  password?: string | null
}
