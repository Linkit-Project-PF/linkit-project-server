import { type ReviewEntity } from '../domain/review/review.entity'
import { type ReviewRepository } from '../domain/review/review.repository'
import { ReviewValue } from '../domain/review/review.value'

export class ReviewUseCase {
  constructor (private readonly ReviewRepository: ReviewRepository) {}

  public createReview = async (
    review: ReviewEntity
  ): Promise<ReviewEntity | string> => {
    const newReview = new ReviewValue(review)
    const ReviewCreated = await this.ReviewRepository.createReview(newReview)
    return ReviewCreated
  }

  public findReview = async (value: string, filter: string): Promise<ReviewEntity | ReviewEntity[] | string> => {
    const review = await this.ReviewRepository.findReview(value, filter)
    return review
  }

  public editReview = async (
    _id: string, review: ReviewEntity): Promise<ReviewEntity | string> => {
    const editedReview = await this.ReviewRepository.editReview(_id, review)
    return editedReview
  }

  public deleteReview = async (
    id: string, total?: string): Promise<ReviewEntity[]> => {
    const deleted = await this.ReviewRepository.deleteReview(id, total)
    return deleted
  }
}
