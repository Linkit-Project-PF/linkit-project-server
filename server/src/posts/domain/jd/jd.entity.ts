export interface JdEntity {
  id: string
  airTableId?: string | null//! Preguntar a la empresa
  title: string
  description: string
  createdDate: Date
  image?: string | null
  requisites: string[] | string
  modality: string
  location: string
  stack: string[] | string
  schedule: string
  archived?: boolean | null
}
