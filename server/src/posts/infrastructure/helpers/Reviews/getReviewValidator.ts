import { ServerError, UncatchedError } from '../../../../errors/errors'
import { type ReviewUseCase } from '../../../aplication/reviewUseCase'
import { type ReviewEntity } from '../../../domain/review/review.entity'

interface ReviewQuery {
  id?: string
  name?: string
  rol?: string
  country?: string
  detail?: string
  archived?: string
}

export default async function getReviewtValidator (query: ReviewQuery, reviewUseCase: ReviewUseCase): Promise<ReviewEntity | ReviewEntity[] | string> {
  try {
    let review
    if (Object.keys(query).length) {
      const filter: string = Object.keys(query)[0]
      const value: string = Object.values(query)[0]
      review = await reviewUseCase.findReview(value, filter)
    } else {
      review = await reviewUseCase.findReview('', 'all')
    }
    return review as ReviewEntity[]
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'searching review', 'buscar valoracion')
  }
}
