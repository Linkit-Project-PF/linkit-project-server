export interface CompanyEntity {
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
}
