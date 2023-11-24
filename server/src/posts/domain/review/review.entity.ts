export interface ReviewEntity {
  name: string
  rol: string
  createdDate: Date
  image?: string | null
  country: string
  detail: string
  archived?: boolean
}
