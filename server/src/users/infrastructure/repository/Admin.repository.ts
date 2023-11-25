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
      const validParams = ['name', 'email', 'active']
      if (filter === 'all') result = await Admin.find()
      else if (filter === 'id') result = await Admin.findById(value)
      else if (validParams.includes(filter)) result = await Admin.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as AdminEntity[]
    } catch (error) {
      throw new ValidationError(`Error al buscar el administrador: ${(error as Error).message}`)
    }
  }

  async editAdmin (_id: string, admin: AdminEntity): Promise<AdminEntity | string> {
    try {
      const editAdmin = await Admin.findByIdAndUpdate(_id, admin, { new: true })
      return editAdmin as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error al editar el administrador: ${(error as Error).message}`)
    }
  }

  async deleteAdmin (_id: string): Promise<AdminEntity | string> {
    try {
      ValidateUserDelete(_id)
      const resultado = 'Administrador eliminado'
      await Admin.findByIdAndUpdate(_id, { $set: { active: false } }, { new: true })
      return resultado as unknown as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }
}
