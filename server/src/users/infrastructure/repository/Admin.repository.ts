import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type AdminRepository } from '../../domain/admin/admin.repository'
import { ValidationError } from '../../../errors/errors'
import { validateIfEmailExists } from '../../../errors/validation'
import Admin from '../schema/Admin'
import { objectIDValidator } from '../helpers/validateObjectID'

export class MongoAdminRepository implements AdminRepository {
  async createAdmin (admin: AdminEntity): Promise<AdminEntity> {
    try {
      await validateIfEmailExists(admin.email)
      const adminCreated = await Admin.create(admin)
      return adminCreated as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error on register: ${(error as Error).message}`)
    }
  }

  async findAdmin (value: string, filter: string): Promise<AdminEntity | AdminEntity[]> {
    try {
      let result
      const validParams = ['name', 'email', 'active']
      if (filter === 'all') result = await Admin.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'admin to search')
        result = await Admin.findById(value)
        if (!result) throw Error('No admins found under that id')
      } else if (validParams.includes(filter)) result = await Admin.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error on search: ${(error as Error).message}`)
    }
  }

  async editAdmin (_id: string, info: any): Promise<AdminEntity> {
    try {
      objectIDValidator(_id, 'admin to edit')
      const invalidEdit = ['_id', 'role', 'createdDate']
      Object.keys(info).forEach(key => { if (invalidEdit.includes(key)) throw Error('ID/role/date cannot be changed') })
      const editAdmin = await Admin.findByIdAndUpdate(_id, info, { new: true })
      return editAdmin as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error on edit: ${(error as Error).message}`)
    }
  }

  async deleteAdmin (_id: string): Promise<AdminEntity> {
    try {
      objectIDValidator(_id, 'admin to delete')
      const result = await Admin.findByIdAndUpdate(_id, { active: false }, { new: true })
      return result as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error on delete: ${(error as Error).message}`)
    }
  }
}
