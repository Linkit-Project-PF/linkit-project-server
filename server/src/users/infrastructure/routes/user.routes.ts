import { Router } from 'express'
import { UserUseCase } from '../../aplication/userUseCase'
import { UserControllers } from '../controllers/user.controllers'
import { MongoRepository } from '../repository/User.repository'

const userRoute = Router()

const mongoUserRepository = new MongoRepository()
const userUseCase = new UserUseCase(mongoUserRepository)
const userController = new UserControllers(userUseCase)

userRoute.post('/register', userController.postController)
userRoute.get('/login', userController.getController)
userRoute.put('/edit', userController.putController)

export default userRoute
