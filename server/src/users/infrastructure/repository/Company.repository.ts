import { type CompanyEntity } from '../../domain/company/company.entity'
import { type CompanyRepository } from '../../domain/company/company.repository'
import Company from '../schema/Company'
import { companyMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/companyMail'
import base from '../../../db/airtable'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import { objectIDValidator } from '../helpers/validateObjectID'
import { validateCompanyCreation } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { MongoJdRepository } from '../../../posts/infrastructure/repository/Jd.repository'

export class MongoCompanyRepository implements CompanyRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {}
  async createCompany (company: CompanyEntity): Promise<CompanyEntity> {
    try {
      await validateCompanyCreation(company)
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
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating company', 'crear empresa')
    }
  }

  async findCompany (value: string, filter: string): Promise<CompanyEntity | CompanyEntity[]> {
    try {
      let result
      const validSingleParams = ['name', 'email', 'active']
      const validIncludeParams = ['jds']
      if (filter === 'all') result = await Company.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'company id to search', 'empresa a buscar')
        result = await Company.findById(value)
        if (!result) throw new ServerError('No company found under that id', 'No se encontro empresa con ese ID', 404)
      } else if (validSingleParams.includes(filter)) result = await Company.find({ [filter]: value })
      else if (validIncludeParams.includes(filter)) {
        result = await Company.find({ [filter]: { $in: [value] } })
      } else throw new ServerError('Not a valid parameter', 'Parametro invalido', 406)
      return result as CompanyEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching company', 'buscar empresa')
    }
  }

  async editCompany (id: string, info: any): Promise<CompanyEntity> {
    try {
      objectIDValidator(id, 'company to edit', 'empresa a editar')
      const invalidEdit = ['_id', 'role', 'airTableId', 'jds', 'registeredDate', 'email']
      Object.keys(info).forEach(key => {
        if (invalidEdit.includes(key)) {
          throw new ServerError('ID/airtableID/role/date/email or jds cannot be changed through this route',
            'ID/ID de airtable/rol/fecha/email o vacantes no son editables o no se pueden editar por esta ruta', 403)
        }
      })
      const editedCompany = await Company.findByIdAndUpdate(id, info, { new: true })
      if (!editedCompany) throw new ServerError('No company found under that ID', 'No se encontro empresa con ese ID', 404)
      return editedCompany as CompanyEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing company', 'editar empresa')
    }
  }

  async deleteCompany (id: string, total?: string): Promise<CompanyEntity | string> {
    try {
      objectIDValidator(id, 'company to delete', 'empresa a eliminar')
      const company = await Company.findById(id)
      if (!company) throw new ServerError('No company found with that ID', 'No se encontro empresa con ese ID', 404)
      else {
        if (!total || total === 'false') {
          const resultado = await Company.findByIdAndUpdate(
            id,
            { active: !company.active }, { new: true }
          )
          return resultado as CompanyEntity
        } else if (total === 'true') {
          const provider = new MongoJdRepository()
          for (let i = 0; i < company.jds.length; i++) {
            await provider.deleteJD(company.jds[i].toString(), 'true')
          }
          await Company.findByIdAndDelete(id)
        }
        return 'Company deleted completely, plus JDS related, plus postulations related to each JD'
      }
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'delting company', 'eliminar empresa')
    }
  }
}
