import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type AdminRepository } from '../../domain/admin/admin.repository'
import { ValidationError } from '../../../errors/errors'
import { validateIfEmailExists } from '../../../errors/validation'
import Admin from '../collections/Admin'
import { objectIDValidator } from '../helpers/validateObjectID'

export class MongoAdminRepository implements AdminRepository {
  async createAdmin (admin: AdminEntity): Promise<AdminEntity> {
    try {
      await validateIfEmailExists(admin.email, 'admin')
      const adminCreated = await Admin.create(admin)
      return adminCreated as unknown as AdminEntity
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
      } else if (validParams.includes(filter)) result = await Admin.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as unknown as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error on search: ${(error as Error).message}`)
    }
  }

  async editAdmin (_id: string, info: any): Promise<AdminEntity> {
    try {
      objectIDValidator(_id, 'admin to edit')
      const editAdmin = await Admin.findByIdAndUpdate(_id, info, { new: true })
      return editAdmin as unknown as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error on edit: ${(error as Error).message}`)
    }
  }

  async deleteAdmin (_id: string): Promise<AdminEntity> {
    try {
      objectIDValidator(_id, 'admin to delete')
      const result = await Admin.findByIdAndUpdate(_id, { active: false }, { new: true })
      return result as unknown as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error on delete: ${(error as Error).message}`)
    }
  }
}
