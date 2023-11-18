import { type RequestHandler } from 'express'
import { type ReviewUseCase } from '../../aplication/reviewUseCase'
import getReviewValidator from '../helpers/getReviewValidator'

export class ReviewController {
  constructor (private readonly reviewUseCase: ReviewUseCase) {}

  public postController: RequestHandler = async (req, res) => {
    try {
      const review = await this.reviewUseCase.createReview(req.body)
      console.log(review)
      if (typeof review === 'string') return res.status(409).json(review)
      return res.status(201).json(review)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      const review = await getReviewValidator(req.query, this.reviewUseCase)
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const review = await this.reviewUseCase.editReview(req.params._id, req.body)
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params
      await this.reviewUseCase.deleteReview(id)
      return res.status(200).json('Publicación eliminada')
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
