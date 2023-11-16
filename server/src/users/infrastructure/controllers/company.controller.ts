import { type RequestHandler } from 'express'
import { type CompanyUseCase } from '../../aplication/companyUseCase'
import getCompanyValidator from '../helpers/getCompanyValidator'

export class CompanyControllers {
  constructor (private readonly companyUseCase: CompanyUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const company = await getCompanyValidator(req.query, this.companyUseCase)
      return res.status(200).json(company)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const company = await this.companyUseCase.createCompany(req.body)
      return res.status(201).json(company)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const company = await this.companyUseCase.editCompany(req.params.id, req.body)
      return res.status(200).json(company)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const company = await this.companyUseCase.deleteCompany(req.params.id)
      return res.status(200).json(company)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
