import { Router } from 'express'
import { AuthUseCase } from './authUseCase'
import { AuthControllers } from './auth.controller'
import { AuthMongoRepository } from './authMongo.repository'

const authRoute = Router()

const mongoAuthRepo = new AuthMongoRepository()
const authCase = new AuthUseCase(mongoAuthRepo)
const authController = new AuthControllers(authCase)

authRoute.get('/login', authController.getController)
authRoute.post('/register', authController.postController)

export default authRoute
