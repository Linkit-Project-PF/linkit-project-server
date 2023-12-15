import { type ReviewEntity } from '../../domain/review/review.entity'
import { type ReviewRepository } from '../../domain/review/review.repository'
import { ValidateReviewCreate, ValidateReviewIfAlreadyonDB } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import Review from '../schema/Review'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'

export class MongoReviewRepository implements ReviewRepository {
  async createReview (review: ReviewEntity): Promise<ReviewEntity | string> {
    try {
      const { name } = review
      // TODO Refactor this code so all validations are done in a single function
      await ValidateReviewIfAlreadyonDB(name)
      ValidateReviewCreate(review)
      let reviewExists = false
      const allTitles = await Review.find({}, 'title type').exec()
      allTitles.forEach(obj => {
        if (obj.name === review.name) reviewExists = true
      })
      if (!reviewExists) {
        const reviewCreated = await Review.create(review)
        return reviewCreated as ReviewEntity
      } else throw new ServerError('There is already a review with this title and type', 'Ya existe otro review de este tipo con este título', 409)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating review', 'crear una valoracion')
    }
  }

  async deleteReview (id: string): Promise<string> {
    try {
      objectIDValidator(id, 'review to delete', 'valoracion a eliminar')
      await Review.updateOne(
        { id },
        { $set: { archived: true } }
      )
      return 'Review deleted'
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting review', 'eliminar valoracion')
    }
  }

  async findReview (value: string, filter: string): Promise<ReviewEntity | ReviewEntity[] | string> {
    try {
      let result
      const validFilters = ['name', 'rol', 'archived', 'country']
      if (filter === 'all') result = await Review.find()
      else if (filter === 'id') result = await Review.findById(value)
      else if (validFilters.includes(filter)) result = await Review.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as ReviewEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching review', 'buscar valoracion')
    }
  }

  async editReview (_id: string, review: any): Promise<ReviewEntity | string> {
    try {
      objectIDValidator(_id, 'review to edit', 'valoracion a editar')
      const invalidEdit = ['_id', 'createdDate']
      Object.keys(review).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('ID/date cannot be changed', 'ID/fecha no pueden ser editados', 403) })
      const editedReview = await Review.findByIdAndUpdate(_id, review, { new: true })
      if (editedReview) return editedReview as ReviewEntity
      else throw new ServerError('Review not found', 'Valoracion no encontrada', 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating review', 'buscar valoracion')
    }
  }
}
