import { Router } from 'express'
import { AuthUseCase } from './authUseCase'
import { AuthControllers } from './auth.controller'
import { AuthMongoRepository } from './authMongo.repository'
import { MailNodeMailerProvider } from './nodemailer/nodeMailer'
import { authValidator } from '../../../middlewares'

const authRoute = Router()

const mailProvider = new MailNodeMailerProvider()
const mongoAuthRepo = new AuthMongoRepository(mailProvider)
const authCase = new AuthUseCase(mongoAuthRepo)
const authController = new AuthControllers(authCase)

authRoute.get('/verify', authController.putController)

authRoute.use(authValidator)
authRoute.post('/login', authController.getController)
authRoute.post('/register', authController.postController)
authRoute.get('/resetPassword', authController.resetPasswordController)

export default authRoute
