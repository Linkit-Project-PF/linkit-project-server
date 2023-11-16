export interface JdEntity {
  id: string
  airTableId: string//! Preguntar a la empresa
  title: string
  description: string
  createdDate: string | null//! Verificar tipo de dato
  image?: string | null
  requisites: string[] | undefined//! Verificar tipo de dato
  modality?: string | null
  location?: string | null
  stack?: string[] | undefined
  schedule?: string | null//! Verificar tipo de dato
  archived?: boolean | null
}
