import { Router } from 'express'
import { CompanyUseCase } from '../../aplication/companyUseCase'
import { CompanyControllers } from '../controllers/company.controller'
import { MongoCompanyRepository } from '../repository/Company.repository'

const companyRoute = Router()

const mongoCompany = new MongoCompanyRepository()
const companyCase = new CompanyUseCase(mongoCompany)
const companyController = new CompanyControllers(companyCase)

companyRoute.get('/find', companyController.getController)
companyRoute.post('/create', companyController.postController)
companyRoute.put('/update', companyController.putController)
companyRoute.delete('/delete/:id', companyController.deleteController)

export default companyRoute
