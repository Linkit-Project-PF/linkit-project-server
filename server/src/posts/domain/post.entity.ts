export interface PostEntity {
  id: string
  airTableId: string//! Preguntar a la empresa
  title: string
  description: string
  createdDate: string | null//! Verificar tipo de dato
  image?: string | null
  link?: string | null
  input: string
  type?: string | null//! Revisar a qué se refiere este campo
  archived?: boolean | null
}
