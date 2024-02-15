export interface ReviewEntity {
  name: string
  createdDate: Date
  image?: string | null
  country?: string | null
  detail: string
  archived?: boolean | null
  createdBy: string
}
