import { type AdminEntity } from '../domain/admin/admin.entity'
import { AdminValue } from '../domain/admin/admin.values'
import { type AdminRepository } from '../domain/admin/admin.repository'

export class AdminUseCase {
  constructor (private readonly adminRepository: AdminRepository) {}

  public loginAdmin = async (email: string, password: string): Promise<AdminEntity | string> => {
    const admin = await this.adminRepository.loginAdmin(email, password)
    return admin
  }

  public findAdminById = async (uuid: string): Promise<AdminEntity | string> => {
    const admin = await this.adminRepository.findAdminById(uuid)
    return admin
  }

  public findAdminByEmail = async (email: string): Promise<AdminEntity | string> => {
    const admin = await this.adminRepository.findAdminByEmail(email)
    return admin
  }

  public registerAdmin = async (admin: AdminEntity, type: string): Promise<AdminEntity | string> => {
    const newAdmin = new AdminValue(admin)
    const adminCreated = await this.adminRepository.registerAdmin(newAdmin, type)
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
