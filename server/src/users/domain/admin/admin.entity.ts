export interface AdminEntity {
  image?: string
  name: string
  email: string
  country?: string | null
  password?: string | null
  role?: string | null
  active?: boolean | null
}
