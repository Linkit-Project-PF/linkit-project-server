import { Router } from 'express'
import { MongoReviewRepository } from '../repository/Review.repository'
import { ReviewUseCase } from '../../aplication/reviewUseCase'
import { ReviewController } from '../controller/review.controller'

const reviewRoute = Router()

const mongoReviewRepository = new MongoReviewRepository()
const reviewUseCase = new ReviewUseCase(mongoReviewRepository)
const reviewController = new ReviewController(reviewUseCase)

reviewRoute.post('/create', reviewController.postController)
reviewRoute.get('/find', reviewController.getController)
reviewRoute.put('/update/:_id', reviewController.putController)
reviewRoute.delete('/delete/:id', reviewController.deleteController)

export default reviewRoute
