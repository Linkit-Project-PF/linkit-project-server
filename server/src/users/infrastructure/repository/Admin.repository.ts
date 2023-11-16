import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type AdminRepository } from '../../domain/admin/admin.repository'
import { ValidationError } from '../../../errors/errors'
import { ValidateUserRegister, ValidateAdminIfAlreadyonDB, ValidateUserLogin } from '../../../errors/validation'
import { createAdmin } from '../helpers/createAdmin'
import mongoDBConnect from '../../../db/mongo'
import Admin from '../collections/Admin'

export class MongoAdminRepository implements AdminRepository {
  async registerAdmin (admin: AdminEntity, type: string): Promise<AdminEntity | string> {
    try {
      await mongoDBConnect()
      await ValidateAdminIfAlreadyonDB(admin.email)
      ValidateUserRegister(admin)
      const adminCreated = await createAdmin(admin, type)
      return adminCreated as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async loginAdmin (email: string, password: string): Promise<AdminEntity | string> {
    try {
      ValidateUserLogin(email, password)
      const [adminData] = await Admin.find({ email })
      return adminData as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error de inicio de sesión: ${(error as Error).message}`)
    }
  }

  async findAdminById (uuid: string): Promise<AdminEntity | string> {
    try {
      const admin = await Admin.findById(uuid)
      return admin as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error al buscar el administrador: ${(error as Error).message}`)
    }
  }

  async editAdmin (id: string, admin: AdminEntity): Promise<AdminEntity | string> {
    try {
      await mongoDBConnect()
      const editAdmin = await Admin.findByIdAndUpdate(id, admin)
      return editAdmin as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error al editar el administrador: ${(error as Error).message}`)
    }
  }

  async findAdminByEmail (email: string): Promise<AdminEntity | string> {
    try {
      const adminFilter = await Admin.find({ email })
      return adminFilter as unknown as AdminEntity
    } catch (error) {
      throw new ValidationError(`Error al buscar el administrador: ${(error as Error).message}`)
    }
  }

  async deleteAdmin (id: string): Promise<AdminEntity | string> {
    try {
      await mongoDBConnect()
      const deleteAdmin = await Admin.findByIdAndDelete(id)
      return deleteAdmin as AdminEntity
    } catch (error: any) {
      throw new ValidationError(`Error al eliminar el administrador: ${(error as Error).message}`)
    }
  }
}
