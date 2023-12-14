export interface ReviewEntity {
  name: string
  role: string
  createdDate: Date
  image?: string | null
  country: string
  detail: string
  archived?: boolean | null
}
