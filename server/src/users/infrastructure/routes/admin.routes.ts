import { Router } from 'express'
import { AdminUseCase } from '../../aplication/adminUseCase'
import { AdminControllers } from '../controllers/admin.controllers'
import { MongoAdminRepository } from '../repository/Admin.repository'
import { MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'

const adminRoute = Router()

const mailProvider = new MailNodeMailerProvider()
const mongoAdminRepository = new MongoAdminRepository(mailProvider)
const adminUseCase = new AdminUseCase(mongoAdminRepository)
const adminController = new AdminControllers(adminUseCase)

adminRoute.get('/find', adminController.getController)
adminRoute.post('/create', adminController.postController)
adminRoute.put('/update/:id', adminController.putController)
adminRoute.delete('/delete/:id', adminController.deleteController)
adminRoute.put('/permissions/:id', adminController.permissionsController)

export default adminRoute
