import { type AdminEntity } from './admin.entity'

export interface AdminRepository {
  findAdmin: (value: string, filter: string) => Promise<AdminEntity | AdminEntity[] | string>
  createAdmin: (admin: AdminEntity) => Promise<AdminEntity | string>
  editAdmin: (id: string, admin: AdminEntity) => Promise<AdminEntity | string>
  deleteAdmin: (id: string) => Promise<AdminEntity | string>
}
