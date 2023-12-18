import { Router } from 'express'
import { PostulationUseCase } from '../../aplication/postulationUseCase'
import { PostulationController } from '../controller/postulation.controller'
import { MongoPostulationRepository } from '../repository/postulation.repository'

const postulationRoute = Router()

const mongoPostRepo = new MongoPostulationRepository()
const postUseCase = new PostulationUseCase(mongoPostRepo)
const postulationController = new PostulationController(postUseCase)

postulationRoute.get('/find', postulationController.getController)
postulationRoute.post('/create', postulationController.postController)
postulationRoute.put('/update/:id', postulationController.editController)
postulationRoute.delete('/delete/:id', postulationController.deleteController)

export default postulationRoute
