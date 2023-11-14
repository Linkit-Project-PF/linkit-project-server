export interface UserEntity {
  _id: string
  image?: string
  name: string
  country: string
  phone: string
  email: string
  password?: string | null //* Important to decide If we keep It, otherwise we need to create another interface */
  role?: string | null
  linkedin?: string | null
  cv?: string | null
  technologies?: string[]
  active?: boolean | null
}
