export interface ReviewEntity {
  id: string
  airTableId?: string | null //! Preguntar a la empresa
  name: string
  rol: string
  createdDate: Date
  image?: string | null
  country: string
  detail: string
  archived: boolean
}
