export interface JdEntity {
  id: string
  airTableId?: string | null//! Preguntar a la empresa
  code: string
  title: string
  description: string
  image?: string | null
  type: string
  location: string
  modality: string
  stack: string[] | string
  aboutUs: string
  aboutClient: string
  responsabilities: string
  requirements: string[] | string
  niceToHave: string[] | string
  benefits: string[] | string
  archived?: boolean | null
  active: boolean
  company: string
  users?: string[] | string
  createdDate: Date
}
