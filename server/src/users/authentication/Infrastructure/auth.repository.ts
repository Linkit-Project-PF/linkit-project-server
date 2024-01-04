// Entities
import { type UserEntity } from '../../domain/user/user.entity'
import { type CompanyEntity } from '../../domain/company/company.entity'
import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type CustomType } from './authMongo.repository'

export interface AuthRepository {
  login: (email: string, password: string, role: string) => Promise<UserEntity | CompanyEntity | AdminEntity | string>
  register: (entity: CustomType) => Promise<UserEntity | CompanyEntity | AdminEntity | string>
  verify: (id: string, role: string) => Promise<string>
  resetPassword: (email: string) => Promise<string>
}
