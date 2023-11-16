export interface AdminEntity {
  image?: string
  name: string
  email: string
  phone: string
  country: string
  linkedin?: string | null
  password?: string
  role?: string | null
  active?: boolean | null
}
