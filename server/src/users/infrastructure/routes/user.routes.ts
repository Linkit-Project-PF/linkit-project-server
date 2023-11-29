import { Router } from 'express'
import { UserUseCase } from '../../aplication/userUseCase'
import { UserControllers } from '../controllers/user.controllers'
import { MongoUserRepository } from '../repository/User.repository'
import { authValidator } from '../helpers/routeValidator'

const userRoute = Router()

const mongoUserRepository = new MongoUserRepository()
const userUseCase = new UserUseCase(mongoUserRepository)
const userController = new UserControllers(userUseCase)

userRoute.use(authValidator)

userRoute.get('/find', userController.getController)
userRoute.post('/create', userController.postController)
userRoute.put('/update/:id', userController.putController)
userRoute.delete('/delete/:id', userController.deleteController)
userRoute.put('/jdRelation', userController.relationController)

export default userRoute
