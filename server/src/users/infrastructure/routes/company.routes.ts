import { Router } from 'express'
import { CompanyUseCase } from '../../aplication/companyUseCase'
import { CompanyControllers } from '../controllers/company.controller'
import { MongoCompanyRepository } from '../repository/Company.repository'
import { MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'

const companyRoute = Router()

const mailProvider = new MailNodeMailerProvider()
const mongoCompany = new MongoCompanyRepository(mailProvider)
const companyCase = new CompanyUseCase(mongoCompany)
const companyController = new CompanyControllers(companyCase)

companyRoute.get('/find', companyController.getController)
companyRoute.post('/create', companyController.postController)
companyRoute.put('/update/:id', companyController.putController)
companyRoute.delete('/delete/:id', companyController.deleteController)

export default companyRoute
