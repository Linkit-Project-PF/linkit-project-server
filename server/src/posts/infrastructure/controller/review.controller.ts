import { type RequestHandler } from 'express'
import { type ReviewUseCase } from '../../aplication/reviewUseCase'
import getReviewValidator from '../helpers/getReviewValidator'
import { permValidator } from '../../../errors/validation'

export class ReviewController {
  constructor (private readonly reviewUseCase: ReviewUseCase) {}

  public postController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'create', 'reviews')
      const review = await this.reviewUseCase.createReview(req.body)
      if (typeof review === 'string') return res.status(409).json(review)
      return res.status(201).json(review)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'get', 'reviews')
      const review = await getReviewValidator(req.query, this.reviewUseCase)
      return res.status(200).json(review)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'update', 'reviews')
      const review = await this.reviewUseCase.editReview(req.params._id, req.body)
      return res.status(200).json(review)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'delete', 'reviews')
      const { id } = req.params
      await this.reviewUseCase.deleteReview(id, req.query.total as string)
      return res.status(200).json('Publicación eliminada')
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
