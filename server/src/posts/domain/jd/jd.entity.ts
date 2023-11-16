export interface JdEntity {
  id: string
  airTableId?: string | null//! Preguntar a la empresa
  title: string
  description: string
  createdDate: Date
  image?: string | null
  requisites: string
  modality: string
  location: string
  stack: string
  schedule: string
  archived?: boolean | null
}
