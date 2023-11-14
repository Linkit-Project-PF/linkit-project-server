import { Router } from 'express'
import { UserUseCase } from '../../aplication/userUseCase'
import { UserControllers } from '../controllers/user.controllers'
import { MongoUserRepository } from '../repository/User.repository'

const userRoute = Router()

const mongoUserRepository = new MongoUserRepository()
const userUseCase = new UserUseCase(mongoUserRepository)
const userController = new UserControllers(userUseCase)

userRoute.post('/register', userController.postController)
userRoute.get('/login', userController.loginController)
userRoute.get('/find', userController.findUserController)
userRoute.put('/update/:id', userController.putController)
userRoute.put('/editRole', userController.putRoleController)
userRoute.delete('/delete/:id', userController.deleteController)

export default userRoute
