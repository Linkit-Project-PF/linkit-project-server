import { Router } from 'express'
import { AdminUseCase } from '../../aplication/adminUseCase'
import { AdminControllers } from '../controllers/admin.controllers'
import { MongoAdminRepository } from '../repository/Admin.repository'

const adminRoute = Router()

const mongoAdminRepository = new MongoAdminRepository()
const adminUseCase = new AdminUseCase(mongoAdminRepository)
const adminController = new AdminControllers(adminUseCase)

adminRoute.get('/find', adminController.getController)
adminRoute.post('/create', adminController.postController)
adminRoute.put('/update/:id', adminController.putController)
adminRoute.delete('/delete/:id', adminController.deleteController)

export default adminRoute
