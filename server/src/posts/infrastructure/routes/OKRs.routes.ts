import { Router } from 'express'
import { MongoOKRsRepository } from '../repository/OKRs.repository'
import { OKRsUseCase } from '../../aplication/OKRsUseCase'
import { OKRsController } from '../controller/OKRs.controller'

const OKRRoute = Router()

const mongoOKRsRepository = new MongoOKRsRepository()
const OKRUseCase = new OKRsUseCase(mongoOKRsRepository)
const OKRController = new OKRsController(OKRUseCase)

OKRRoute.post('/create', OKRController.postController)
OKRRoute.get('/find', OKRController.getController)
OKRRoute.put('/update/:_id', OKRController.putController)
OKRRoute.delete('/delete/:_id', OKRController.deleteController)

export default OKRRoute
