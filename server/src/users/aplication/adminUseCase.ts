import { type AdminEntity } from '../domain/admin/admin.entity'
import { AdminValue } from '../domain/admin/admin.values'
import { type AdminRepository } from '../domain/admin/admin.repository'

export class AdminUseCase {
  constructor (private readonly adminRepository: AdminRepository) {}

  public findAdmin = async (value: string, filter: string): Promise<AdminEntity | AdminEntity[] | string> => {
    const admin = await this.adminRepository.findAdmin(value, filter)
    return admin
  }

  public createAdmin = async (admin: AdminEntity): Promise<AdminEntity | string> => {
    const newAdmin = new AdminValue(admin)
    const adminCreated = await this.adminRepository.createAdmin(newAdmin)
    return adminCreated
  }

  public editAdmin = async (id: string, admin: AdminEntity): Promise<AdminEntity | string> => {
    const editAdmin = await this.adminRepository.editAdmin(id, admin)
    return editAdmin
  }

  public deleteAdmin = async (id: string): Promise<AdminEntity | string> => {
    const deleteAdmin = await this.adminRepository.deleteAdmin(id)
    return deleteAdmin
  }
}
