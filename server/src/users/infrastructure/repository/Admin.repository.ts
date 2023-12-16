import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type AdminRepository } from '../../domain/admin/admin.repository'
import { adminMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/adminMailCreate'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import { validateIfEmailExists } from '../../../errors/validation'
import Admin from '../schema/Admin'
import { objectIDValidator } from '../helpers/validateObjectID'

export class MongoAdminRepository implements AdminRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {
    this.mailNodeMailerProvider = mailNodeMailerProvider
  }

  async createAdmin (admin: AdminEntity): Promise<AdminEntity> {
    try {
      await validateIfEmailExists(admin.email)
      const adminCreated = await Admin.create(admin)
      // TODO Add email sending for admin
      await this.mailNodeMailerProvider.sendEmail(adminMailCreate(admin))
      return adminCreated as AdminEntity
    } catch (error) {
      throw new Error(`Error on register: ${(error as Error).message}`)
    }
  }

  async findAdmin (value: string, filter: string): Promise<AdminEntity | AdminEntity[]> {
    try {
      let result
      const validParams = ['name', 'email', 'active']
      if (filter === 'all') result = await Admin.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'admin to search', 'admin buscado')
        result = await Admin.findById(value)
        if (!result) throw Error('No admins found under that id')
      } else if (validParams.includes(filter)) result = await Admin.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as AdminEntity
    } catch (error) {
      throw new Error(`Error on search: ${(error as Error).message}`)
    }
  }

  async editAdmin (_id: string, info: any): Promise<AdminEntity> {
    try {
      objectIDValidator(_id, 'admin to edit', 'admin a editar')
      const invalidEdit = ['_id', 'role', 'createdDate']
      Object.keys(info).forEach(key => { if (invalidEdit.includes(key)) throw Error('ID/role/date cannot be changed') })
      const editAdmin = await Admin.findByIdAndUpdate(_id, info, { new: true })
      return editAdmin as AdminEntity
    } catch (error: any) {
      throw new Error(`Error on edit: ${(error as Error).message}`)
    }
  }

  async deleteAdmin (_id: string): Promise<AdminEntity> {
    try {
      objectIDValidator(_id, 'admin to delete', 'admin a eliminar')
      const result = await Admin.findByIdAndUpdate(_id, { active: false }, { new: true })
      return result as AdminEntity
    } catch (error) {
      throw new Error(`Error on delete: ${(error as Error).message}`)
    }
  }
}
