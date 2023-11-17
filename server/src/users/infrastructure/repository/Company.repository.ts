/* eslint-disable indent */
import { type CompanyEntity } from '../../domain/company/company.entity'
import { type CompanyRepository } from '../../domain/company/company.repository'
import { ValidationError } from '../../../errors/errors'
import { ValidateCompanyIfAlreadyonDB, ValidateUserDelete, ValidateUserRegister, ValidateUserUpdate } from '../../../errors/validation'
import Company from '../collections/Company'

export class MongoCompanyRepository implements CompanyRepository {
  async createCompany (company: CompanyEntity): Promise<CompanyEntity | string> {
    try {
      await ValidateCompanyIfAlreadyonDB(company.email)
      ValidateUserRegister(company)
      const companyCreated = await Company.create(company)
      return companyCreated as CompanyEntity
    } catch (error) {
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async findCompany (value: string, filter: string): Promise<CompanyEntity | CompanyEntity[] | string> {
    try {
      let result
      const validParams = ['name', 'email', 'active']
      if (filter === 'all') result = await Company.find()
      else if (filter === 'id') result = await Company.findById(value)
      else if (validParams.includes(filter)) result = await Company.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as CompanyEntity
    } catch (error) {
      throw new ValidationError(`Error al buscar: ${(error as Error).message}`)
    }
  }

  async editCompany (id: string, company: CompanyEntity): Promise<CompanyEntity | string> {
    try {
      ValidateUserUpdate(company)
      const editedCompany = await Company.findByIdAndUpdate(id, company)
      return editedCompany as unknown as CompanyEntity
    } catch (error) {
      throw new ValidationError(`Error al editar: ${(error as Error).message}`)
    }
  }

  async deleteCompany (id: string): Promise<CompanyEntity | string> {
    try {
      ValidateUserDelete(id)
      const resultado = await Company.updateOne(
        { id },
        { $set: { active: false } }
      )
      return resultado as unknown as CompanyEntity
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }
}