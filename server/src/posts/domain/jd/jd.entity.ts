export interface JdEntity {
  // airTableId?: string | null//! Preguntar a la empresa
  code: string
  title: string
  description: string
  type: string
  location: string
  modality: string
  stack: string[]
  aboutUs: string
  aboutClient?: string | null
  responsabilities: string
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
  archieved: boolean
  company: string
  users: string[]
  createdDate: Date
}
