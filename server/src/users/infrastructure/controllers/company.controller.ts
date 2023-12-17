import { type RequestHandler } from 'express'
import { type CompanyUseCase } from '../../aplication/companyUseCase'
import getCompanyValidator from '../helpers/company/getCompanyValidator'
import companyAuth from '../helpers/company/companyAuthHelper'

export class CompanyControllers {
  constructor (private readonly companyUseCase: CompanyUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await companyAuth((req as any).userId, 'find')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const company = await getCompanyValidator(req.query, this.companyUseCase)
      return res.status(200).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await companyAuth((req as any).userId, 'create')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const company = await this.companyUseCase.createCompany(req.body)
      return res.status(201).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await companyAuth((req as any).userId, 'edit', req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const company = await this.companyUseCase.editCompany(req.params.id, req.body)
      return res.status(200).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await companyAuth((req as any).userId, 'delete', req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const company = await this.companyUseCase.deleteCompany(req.params.id)
      return res.status(200).json(company)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
