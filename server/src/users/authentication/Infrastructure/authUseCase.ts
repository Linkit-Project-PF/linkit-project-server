import { type UserEntity } from '../../domain/user/user.entity'
import { type AdminEntity } from '../../domain/admin/admin.entity'
import { type CompanyEntity } from '../../domain/company/company.entity'
import { type AuthRepository } from './auth.repository'

export class AuthUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  public login = async (email: string, password: string): Promise<UserEntity | CompanyEntity | AdminEntity | string> => {
    const result = await this.authRepository.login(email, password)
    return result
  }

  public register = async (entity: UserEntity | CompanyEntity | AdminEntity, type: string): Promise<UserEntity | CompanyEntity | AdminEntity | string> => {
    const result = await this.authRepository.register(entity, type)
    return result
  }
}
