export interface UserEntity {
  airTableId?: string | null
  image?: string
  firstName: string
  lastName: string
  email: string
  country?: string | null
  linkedin?: string | null
  cv?: string | null
  englishLevel?: string | null
  role: string
  technologies?: string[]
  active?: boolean | null
  postulations: string[]
  registeredDate: Date
  password?: string | null
}
