import { type ReviewEntity } from './review.entity'

export class ReviewValue implements ReviewEntity {
  name: string
  createdDate: Date
  image?: string | null
  country?: string | null
  detail: string
  archived?: boolean | null
  createdBy: string

  constructor (review: ReviewEntity) {
    this.name = review.name
    this.createdDate = review.createdDate
    this.image = review.image ?? undefined
    this.country = review.country ?? undefined
    this.detail = review.detail
    this.archived = review.archived ?? false
    this.createdBy = review.createdBy
  }
}
