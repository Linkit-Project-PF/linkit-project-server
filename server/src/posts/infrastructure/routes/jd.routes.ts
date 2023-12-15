import { Router } from 'express'
import { MongoJdRepository } from '../repository/Jd.repository'
import { JdUseCase } from '../../aplication/jdUseCase'
import { JdController } from '../controller/jd.controller'
import { authValidator } from '../../../middlewares'

const jdRoute = Router()

const mongoJdRepository = new MongoJdRepository()
const jdUseCase = new JdUseCase(mongoJdRepository)
const jdController = new JdController(jdUseCase)

jdRoute.use(authValidator)

jdRoute.post('/create', jdController.postController)
jdRoute.get('/find', jdController.getController)
jdRoute.put('/update/:_id', jdController.putController)
jdRoute.delete('/delete/:id', jdController.deleteController)

export default jdRoute
