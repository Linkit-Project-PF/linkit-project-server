export interface CompanyEntity {
  image?: string
  name: string
  country: string
  phone: string
  email: string
  password?: string | null
  role?: string | null
  linkedin?: string | null
  active?: boolean | null
  jds: string[]
}
