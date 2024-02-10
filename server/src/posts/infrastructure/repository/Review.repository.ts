import { type ReviewEntity } from '../../domain/review/review.entity'
import { type ReviewRepository } from '../../domain/review/review.repository'
import { validateReview } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import Review from '../schema/Review'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'

export class MongoReviewRepository implements ReviewRepository {
  async createReview (review: ReviewEntity): Promise<ReviewEntity | string> {
    try {
      await validateReview(review)
      const reviewCreated = await Review.create(review)
      return reviewCreated as ReviewEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating review', 'crear una valoracion')
    }
  }

  async findReview (value: string, filter: string): Promise<ReviewEntity | ReviewEntity[] | string> {
    try {
      let result
      const validFilters = ['name', 'rol', 'archived', 'country']
      if (filter === 'all') result = await Review.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'searched review', 'valoracion buscada')
        result = await Review.findById(value)
        if (!result) throw new ServerError('No review found under that ID', 'No se encontro valoracion con ese ID', 404)
      } else if (validFilters.includes(filter)) result = await Review.find({ [filter]: value })
      else throw new ServerError('Not a valid parameter', 'Parametro de busqueda invalido', 406)
      return result as ReviewEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching review', 'buscar valoracion')
    }
  }

  async editReview (_id: string, review: any): Promise<ReviewEntity | string> {
    try {
      objectIDValidator(_id, 'review to edit', 'valoracion a editar')
      const invalidEdit = ['_id', 'createdDate', 'createdBy']
      Object.keys(review).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('ID/date/createdBy cannot be changed', 'ID/fecha/autor no pueden ser editados', 403) })
      const editedReview = await Review.findByIdAndUpdate(_id, review, { new: true })
      if (editedReview) return editedReview as ReviewEntity
      else throw new ServerError('Review not found', 'Valoracion no encontrada', 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating review', 'buscar valoracion')
    }
  }

  async deleteReview (id: string, total?: string): Promise<ReviewEntity[]> {
    try {
      objectIDValidator(id, 'review to delete', 'valoracion a eliminar')
      const review = await Review.findById(id)
      if (!review) throw new ServerError('Review not found', 'Reseña no encontrada', 404)
      if (!total || total === 'false') {
        await Review.findByIdAndUpdate(
          id,
          { archived: !review.archived }
        )
      } else if (total === 'true') {
        await Review.findByIdAndDelete(id)
        return await Review.find()
      }
      const result = await Review.find()
      return result
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting review', 'eliminar valoracion')
    }
  }
}
