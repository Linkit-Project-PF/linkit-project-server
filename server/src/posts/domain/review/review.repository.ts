import { type ReviewEntity } from './review.entity'

export interface ReviewRepository {
  createReview: (review: ReviewEntity) => Promise<ReviewEntity | string>
  findReview: (value: string, filter: string) => Promise<ReviewEntity | ReviewEntity[] | string>
  editReview: (_id: string, review: ReviewEntity) => Promise<ReviewEntity | string>
  deleteReview: (id: string, total?: string) => Promise<ReviewEntity[]>
}
