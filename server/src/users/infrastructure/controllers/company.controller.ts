import { type RequestHandler } from 'express'
import { type CompanyUseCase } from '../../aplication/companyUseCase'
import getCompanyValidator from '../helpers/getCompanyValidator'
import { permValidator } from '../../../errors/validation'

export class CompanyControllers {
  constructor (private readonly companyUseCase: CompanyUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'get', 'companies')
      const company = await getCompanyValidator(req.query, this.companyUseCase)
      return res.status(200).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'create', 'companies')
      const company = await this.companyUseCase.createCompany(req.body)
      return res.status(201).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'update', 'companies')
      const company = await this.companyUseCase.editCompany(req.params.id, req.body)
      return res.status(200).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'delete', 'companies')
      const company = await this.companyUseCase.deleteCompany(req.params.id)
      return res.status(200).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
