import { type ReviewEntity } from '../../domain/review/review.entity'
import { type ReviewRepository } from '../../domain/review/review.repository'
// import { ValidatePostCreate, ValidatePostDelete } from '../../../errors/validation' //, ValidatePostFindByType, ValidatePostFindByTitle
import { ValidationError } from '../../../errors/errors'
import Review from '../collections/Review'
import mongoDBConnect from '../../../db/mongo'

export class MongoReviewRepository implements ReviewRepository {
  async createReview (review: ReviewEntity): Promise<ReviewEntity | string> {
    try {
    //   ValidateReviewCreate(review)
      let reviewExists = false
      const allTitles = await Review.find({}, 'title type')
      allTitles.forEach(obj => {
        if (obj.name === review.name) reviewExists = true
      })
      if (!reviewExists) {
        const reviewCreated = await Review.create(review)
        return reviewCreated as ReviewEntity
      } else throw Error('Ya existe otro review de este tipo con este título')
    } catch (error: any) {
      throw new ValidationError(`Error al crear el review: ${(error as Error).message}`)
    }
  }

  async deleteReview (id: string): Promise<string> {
    try {
    //   ValidateReviewDelete(id)
      await mongoDBConnect()
      await Review.updateOne(
        { id },
        { $set: { archived: true } }
      )
      return 'Review archivado'
    } catch (error) {
      console.error(error)
      return 'Error al intentar archivar la reseña'
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
    } catch (error) {
      throw new ValidationError(`Error al buscar el review: ${(error as Error).message}`)
    }
  }

  async editReview (_id: string, review: ReviewEntity): Promise<ReviewEntity | string> {
    try {
      const editedReview = await Review.findByIdAndUpdate(_id, review)
      return editedReview as ReviewEntity
    } catch (error) {
      throw new ValidationError(`Error al editar la reseña: ${(error as Error).message}`)
    }
  }
}
