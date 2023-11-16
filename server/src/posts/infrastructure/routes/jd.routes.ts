import { Router } from 'express'
import { MongoJdRepository } from '../repository/Jd.repository'
import { JdUseCase } from '../../aplication/jdUseCase'
import { JdController } from '../controller/jd.controller'

const jdRoute = Router()

const mongoJdRepository = new MongoJdRepository()
const jdUseCase = new JdUseCase(mongoJdRepository)
const jdController = new JdController(jdUseCase)

jdRoute.post('/createJd', jdController.postJdController)
jdRoute.get('/searchJd', jdController.getJdController)
jdRoute.put('/updateJd/:_id', jdController.putJdController)
jdRoute.delete('/deleteJd/:id', jdController.deleteJdController)

export default jdRoute
