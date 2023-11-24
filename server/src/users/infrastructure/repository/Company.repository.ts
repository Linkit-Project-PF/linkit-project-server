/* eslint-disable indent */
import { type CompanyEntity } from '../../domain/company/company.entity'
import { type CompanyRepository } from '../../domain/company/company.repository'
import { ValidationError } from '../../../errors/errors'
import { ValidateCompanyIfAlreadyonDB, ValidateUserDelete } from '../../../errors/validation'
import Company from '../collections/Company'
import base from '../../../db/airtable'

export class MongoCompanyRepository implements CompanyRepository {
  async createCompany (company: CompanyEntity): Promise<CompanyEntity | string> {
    try {
      await ValidateCompanyIfAlreadyonDB(company.email)
      const mongoCompany = await Company.create(company)
      const mongoID = String(mongoCompany._id)
      const airtableCompany = await base('UsersInfo').create({
        Nombre: company.name,
        Email: company.email,
        Rol: company.role,
        WebID: mongoID
      })
      const companyCreated = await Company.findByIdAndUpdate(mongoID, { airTableId: airtableCompany.getId() }, { new: true })
      return companyCreated as CompanyEntity
    } catch (error) {
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async findCompany (value: string, filter: string): Promise<CompanyEntity | CompanyEntity[] | string> {
    try {
      let result
      const validParams = ['name', 'email', 'active', 'jds']
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
      const editedCompany = await Company.findByIdAndUpdate(id, company, { new: true })
      return editedCompany as unknown as CompanyEntity
    } catch (error) {
      throw new ValidationError(`Error al editar: ${(error as Error).message}`)
    }
  }

  async deleteCompany (id: string): Promise<CompanyEntity | string> {
    try {
      ValidateUserDelete(id)
      const resultado = await Company.findByIdAndUpdate(
        id,
        { $set: { active: false } }, { new: true }
      )
      return resultado as unknown as CompanyEntity
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }
}
