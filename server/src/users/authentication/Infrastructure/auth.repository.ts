// Entities
import { type UserEntity } from '../../domain/user/user.entity'
import { type CompanyEntity } from '../../domain/company/company.entity'
import { type AdminEntity } from '../../domain/admin/admin.entity'

export interface AuthRepository {
  login: (email: string, password: string) => Promise<UserEntity | CompanyEntity | AdminEntity | string>
  register: (entity: UserEntity | CompanyEntity | AdminEntity) => Promise<UserEntity | CompanyEntity | AdminEntity | string>
  verify: (id: string, role: string) => Promise<string>
}
