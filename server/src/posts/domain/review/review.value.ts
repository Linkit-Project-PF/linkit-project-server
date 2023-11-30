import { type ReviewEntity } from './review.entity'

export class ReviewValue implements ReviewEntity {
  name: string
  rol: string
  createdDate: Date
  image?: string | null
  country: string
  detail: string
  archived?: boolean | null

  constructor (review: ReviewEntity) {
    this.name = review.name
    this.rol = review.rol
    this.createdDate = review.createdDate
    this.image = review.image ?? undefined
    this.country = review.country
    this.detail = review.detail
    this.archived = review.archived ?? false
  }
}
