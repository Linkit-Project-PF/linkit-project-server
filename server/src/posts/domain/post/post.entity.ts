export interface PostEntity {
  // airTableId?: string | null //! Preguntar a la empresa
  title: string
  description: string
  headers?: string[]
  createdDate: Date
  image?: string | null
  link?: string | null
  type: string
  archived?: boolean | null
  category?: string | null
}
