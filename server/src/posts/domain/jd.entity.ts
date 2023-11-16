export interface JdEntity {
  id: string
  airTableId: string | null//! Preguntar a la empresa
  title: string
  description: string
  createdDate: string | null//! Verificar tipo de dato
  image?: string | null
  requisites: string | null//! Verificar tipo de dato
  modality?: string | null
  location?: string | null
  stack?: string | null//! Verificar tipo de dato
  schedule?: string | null//! Verificar tipo de dato
  archived?: boolean | null
}
