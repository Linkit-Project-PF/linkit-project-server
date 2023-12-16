import { type AdminEntity } from './admin.entity'

export interface AdminRepository {
  findAdmin: (value: string, filter: string) => Promise<AdminEntity | AdminEntity[]>
  createAdmin: (admin: AdminEntity) => Promise<AdminEntity>
  editAdmin: (id: string, admin: AdminEntity) => Promise<AdminEntity>
  deleteAdmin: (id: string, total?: string) => Promise<AdminEntity | string>
}
