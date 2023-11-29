export interface postulations {
  jd: string
  status: string
}

export interface UserEntity {
  airTableId?: string | null
  image?: string
  name: string
  country?: string | null
  phone?: string | null
  email: string
  password?: string | null //* Important to decide If we keep It, otherwise we need to create another interface */
  role: string
  linkedin?: string | null
  cv?: string | null
  technologies?: string[]
  postulations?: postulations[]
  active?: boolean | null
}
