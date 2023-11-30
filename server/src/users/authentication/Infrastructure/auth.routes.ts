import { Router } from 'express'
import { AuthUseCase } from './authUseCase'
import { AuthControllers } from './auth.controller'
import { AuthMongoRepository } from './authMongo.repository'
import { MailNodeMailerProvider } from './nodemailer/nodeMailer'

const authRoute = Router()

const mailProvider = new MailNodeMailerProvider()
const mongoAuthRepo = new AuthMongoRepository(mailProvider)
const authCase = new AuthUseCase(mongoAuthRepo)
const authController = new AuthControllers(authCase)

authRoute.get('/login', authController.getController)
authRoute.get('/verify', authController.putController)
authRoute.post('/register', authController.postController)

export default authRoute
