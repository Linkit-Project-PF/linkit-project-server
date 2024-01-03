import { Router } from 'express'
import { PostulationUseCase } from '../../aplication/postulationUseCase'
import { PostulationController } from '../controller/postulation.controller'
import { MongoPostulationRepository } from '../repository/postulation.repository'
import { MailNodeMailerProvider } from '../../../users/authentication/Infrastructure/nodemailer/nodeMailer'

const postulationRoute = Router()

const mailProvider = new MailNodeMailerProvider()
const mongoPostRepo = new MongoPostulationRepository(mailProvider)
const postUseCase = new PostulationUseCase(mongoPostRepo)
const postulationController = new PostulationController(postUseCase)

postulationRoute.get('/find', postulationController.getController)
postulationRoute.post('/create', postulationController.postController)

export default postulationRoute
