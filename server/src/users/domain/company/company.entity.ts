export interface CompanyEntity {
  id: string
  image?: string
  name: string
  country: string
  phone: string
  email: string
  password?: string | null
  role?: string | null
  linkedin?: string | null
  // TODO Add jobOffers as a prop with type JDEntity
  active?: boolean | null
}
