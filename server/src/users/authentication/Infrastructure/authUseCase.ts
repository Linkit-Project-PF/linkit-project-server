import { type UserEntity } from '../../domain/user/user.entity'
import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type CompanyEntity } from '../../domain/company/company.entity'
import { type AuthRepository } from './auth.repository'
import { type CustomType } from './authMongo.repository'

export class AuthUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  public login = async (email: string, password: string, role: string): Promise<UserEntity | CompanyEntity | AdminEntity | string> => {
    const result = await this.authRepository.login(email, password, role)
    return result
  }

  public register = async (entity: CustomType): Promise<UserEntity | CompanyEntity | AdminEntity | string> => {
    const result = await this.authRepository.register(entity)
    return result
  }

  public verify = async (id: string, role: string): Promise<string> => {
    const result = await this.authRepository.verify(id, role)
    return result
  }

  public resetPassword = async (email: string): Promise<void> => {
    await this.authRepository.resetPassword(email)
  }
}
