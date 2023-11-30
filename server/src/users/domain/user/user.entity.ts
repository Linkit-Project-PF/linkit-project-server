export interface postulations {
  jd: string
  status: string
}

export interface UserEntity {
  airTableId?: string | null
  image?: string
  name: string
  email: string
  country?: string | null
  linkedin?: string | null
  cv?: string | null
  englishLevel?: string | null
  role: string
  technologies?: string[]
  active?: boolean | null
  postulations?: postulations[]
  registeredDate: Date
  password?: string | null
}
