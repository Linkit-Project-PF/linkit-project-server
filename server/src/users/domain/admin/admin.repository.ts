import { type AdminEntity } from './admin.entity'

export interface AdminRepository {
  loginAdmin: (email: string, password: string) => Promise<AdminEntity | string>
  findAdminById: (id: string) => Promise<any>
  findAdminByEmail: (email: string) => Promise<AdminEntity | string>
  registerAdmin: (admin: AdminEntity, type: string) => Promise<AdminEntity | string>
  editAdmin: (id: string, admin: AdminEntity) => Promise<AdminEntity | string>
  deleteAdmin: (id: string) => Promise<AdminEntity | string>
}
