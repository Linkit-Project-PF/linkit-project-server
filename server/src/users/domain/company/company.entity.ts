export interface CompanyEntity {
  airTableId?: string | null
  image?: string
  name: string
  country?: string | null
  phone?: string | null
  email: string
  password?: string | null
  role: string
  linkedin?: string | null
  active?: boolean | null
  jds: string[]
}
