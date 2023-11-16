/* eslint-disable indent */
import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type AdminRepository } from '../../domain/admin/admin.repository'
import { ValidationError } from '../../../errors/errors'
import { ValidateAdminIfAlreadyonDB, ValidateUserDelete } from '../../../errors/validation'
import Admin from '../collections/Admin'

export class MongoAdminRepository implements AdminRepository {
  async createAdmin (admin: AdminEntity): Promise<AdminEntity | string> {
    try {
      await ValidateAdminIfAlreadyonDB(admin.email)
      const adminCreated = await Admin.create(admin)
      return adminCreated as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async findAdmin (value: string, filter: string): Promise<AdminEntity | AdminEntity[] | string> {
    try {
      let result
      switch (filter) {
        case 'id':
          result = await Admin.findById(value)
          break
        case 'name':
          result = await Admin.find({ name: value })
          break
        case 'email':
          result = await Admin.find({ email: value })
          break
        case 'active':
          result = await Admin.find({ active: value })
          break
        case 'all':
          result = await Admin.find()
          break
        default:
          result = 'Not a valid parameter'
      }
      return result as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error al buscar el administrador: ${(error as Error).message}`)
    }
  }

  async editAdmin (_id: string, admin: AdminEntity): Promise<AdminEntity | string> {
    try {
      const editAdmin = await Admin.findByIdAndUpdate(_id, admin)
      return editAdmin as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error al editar el administrador: ${(error as Error).message}`)
    }
  }

  async deleteAdmin (_id: string): Promise<AdminEntity | string> {
    try {
      ValidateUserDelete(_id)
      const resultado = await Admin.updateOne(
        { _id },
        { $set: { active: false } }
      )
      return resultado as unknown as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }
}
