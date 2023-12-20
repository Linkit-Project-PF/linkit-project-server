import { type permissions, type AdminEntity } from '../domain/admin/admin.entity'
import { AdminValue } from '../domain/admin/admin.values'
import { type AdminRepository } from '../domain/admin/admin.repository'

export class AdminUseCase {
  constructor (private readonly adminRepository: AdminRepository) {}

  public findAdmin = async (value: string, filter: string): Promise<AdminEntity | AdminEntity[]> => {
    const admin = await this.adminRepository.findAdmin(value, filter)
    return admin
  }

  public createAdmin = async (admin: AdminEntity): Promise<AdminEntity> => {
    const newAdmin = new AdminValue(admin)
    const adminCreated = await this.adminRepository.createAdmin(newAdmin)
    return adminCreated
  }

  public editAdmin = async (id: string, admin: AdminEntity): Promise<AdminEntity> => {
    const editAdmin = await this.adminRepository.editAdmin(id, admin)
    return editAdmin
  }

  public deleteAdmin = async (id: string, reqID?: string, total?: string): Promise<AdminEntity | string> => {
    const deleteAdmin = await this.adminRepository.deleteAdmin(id, reqID, total)
    return deleteAdmin
  }

  public editPermissions = async (id: string, permissions: permissions): Promise<AdminEntity> => {
    const permAdmin = await this.adminRepository.editPermissions(id, permissions)
    return permAdmin
  }
}
