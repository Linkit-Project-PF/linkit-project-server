import { Router } from 'express'
import { UserUseCase } from '../../aplication/userUseCase'
import { UserControllers } from '../controllers/user.controllers'
import { MongoUserRepository } from '../repository/User.repository'
import { MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'

const userRoute = Router()

const mailProvider = new MailNodeMailerProvider()
const mongoUserRepository = new MongoUserRepository(mailProvider)
const userUseCase = new UserUseCase(mongoUserRepository)
const userController = new UserControllers(userUseCase)

userRoute.get('/find', userController.getController)
userRoute.post('/create', userController.postController)
userRoute.put('/update/:id', userController.putController)
userRoute.delete('/delete/:id', userController.deleteController)

export default userRoute
