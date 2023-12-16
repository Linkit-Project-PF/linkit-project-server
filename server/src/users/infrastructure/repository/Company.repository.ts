import { type CompanyEntity } from '../../domain/company/company.entity'
import { type CompanyRepository } from '../../domain/company/company.repository'
import Company from '../schema/Company'
import { companyMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/companyMail'
import base from '../../../db/airtable'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import { objectIDValidator } from '../helpers/validateObjectID'
import { validateIfEmailExists } from '../../../errors/validation'
import Jd from '../../../posts/infrastructure/schema/Jd'

export class MongoCompanyRepository implements CompanyRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {}
  async createCompany (company: CompanyEntity): Promise<CompanyEntity> {
    try {
      await validateIfEmailExists(company.email)
      const mongoCompany = await Company.create(company)
      const mongoID = String(mongoCompany._id)
      const airtableCompany = await base('UsersInfo').create({
        Nombre: company.companyName,
        Email: company.email,
        Rol: company.role,
        WebID: mongoID
      })
      await this.mailNodeMailerProvider.sendEmail(companyMailCreate(company))
      const companyCreated = await Company.findByIdAndUpdate(mongoID, { airTableId: airtableCompany.getId() }, { new: true })
      return companyCreated as CompanyEntity
    } catch (error) {
      throw new Error(`Error on register: ${(error as Error).message}`)
    }
  }

  async findCompany (value: string, filter: string): Promise<CompanyEntity | CompanyEntity[]> {
    try {
      let result
      const validParams = ['name', 'email', 'active', 'jds']
      if (filter === 'all') result = await Company.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'company id to search', 'empresa a buscar')
        result = await Company.findById(value)
        if (!result) throw Error('No company found under that id')
      } else if (validParams.includes(filter)) result = await Company.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as CompanyEntity
    } catch (error) {
      throw new Error(`Error on search: ${(error as Error).message}`)
    }
  }

  async editCompany (id: string, info: any): Promise<CompanyEntity> {
    try {
      objectIDValidator(id, 'company to edit', 'empresa a editar')
      const invalidEdit = ['_id', 'role', 'airTableId', 'jds', 'registeredDate']
      Object.keys(info).forEach(key => { if (invalidEdit.includes(key)) throw Error('ID/airtableID/role/date or jds cannot be changed through this route') })
      const editedCompany = await Company.findByIdAndUpdate(id, info, { new: true })
      return editedCompany as CompanyEntity
    } catch (error) {
      throw new Error(`Error editing: ${(error as Error).message}`)
    }
  }

  async deleteCompany (id: string): Promise<CompanyEntity> {
    try {
      objectIDValidator(id, 'company to delete', 'empresa a eliminar')
      const resultado = await Company.findByIdAndUpdate(
        id,
        { active: false }, { new: true }
      )
      return resultado as CompanyEntity
    } catch (error) {
      throw new Error(`Error on delete: ${(error as Error).message}`)
    }
  }

  async relateJd (jdID: string, companyID: string, operation: string): Promise<CompanyEntity> {
    try {
      if (!jdID || !companyID || !operation) throw Error('Missing parameters: jd, company and operation is needed')
      objectIDValidator(jdID, 'company in relation', 'empresa a relacionar')
      objectIDValidator(companyID, 'jd to relate', 'vacante a relacionar')
      if (operation === 'create') {
        const company = await Company.findById(companyID)
        if (!company) throw Error('Company does not exist')
        const jd = await Jd.findById(jdID, '_id')
        if (!jd) throw Error('Job Description does not exist')
        company.jds.push(jd._id)
        const replacedCompany = await Company.findOneAndReplace({ _id: companyID }, company, { new: true })
        return replacedCompany as CompanyEntity
      } else throw Error('Not a valid operation')
    } catch (error) {
      throw Error(`Error relating jd to company: ${(error as Error).message}`)
    }
  }
}
