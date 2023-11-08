import { Router } from 'express'
import { AirtableRepository } from '../repository/airtable.repository'
import { UserUseCase } from '../../aplication/userUseCase'
import { UserControllers } from '../controllers/user.controllers'

const userRoute = Router()

const airtableUserRepo = new AirtableRepository()
const userUseCase = new UserUseCase(airtableUserRepo)
const userController = new UserControllers(userUseCase)

userRoute.post('/register', userController.postController)
userRoute.get('/login', userController.loginController)

export default userRoute
