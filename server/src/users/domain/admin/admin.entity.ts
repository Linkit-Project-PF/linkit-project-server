export interface permissions {
  get: string[]
  create: string[]
  update: string[]
  delete: string[]
  special: string[]
}

export interface AdminEntity {
  firebaseId?: string | null
  image?: string | null
  firstName: string
  lastName: string
  email: string
  country?: string | null
  password?: string | null
  role?: string | null
  active?: boolean | null
  createdDate: Date
  permissions?: permissions | null
  provider: string
}
