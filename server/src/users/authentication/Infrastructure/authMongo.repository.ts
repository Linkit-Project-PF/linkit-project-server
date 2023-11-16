// Entities
import { type UserEntity } from '../../domain/user/user.entity'
import { type CompanyEntity } from '../../domain/company/company.entity'
import { type AdminEntity } from '../../domain/admin/admin.entity'
// Repositories
import { type AuthRepository } from './auth.repository'
// Validations
//* Error handling imports here
// Firebase
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// Repositories
import { MongoUserRepository } from '../../infrastructure/repository/User.repository'
import { MongoCompanyRepository } from '../../infrastructure/repository/Company.repository'
import { MongoAdminRepository } from '../../infrastructure/repository/Admin.repository'

export class AuthMongoRepository implements AuthRepository {
  async register (entity: UserEntity | CompanyEntity | AdminEntity): Promise<UserEntity | CompanyEntity | AdminEntity | string> {
    try {
      await createUserWithEmailAndPassword(auth, String(entity.email), String(entity.password))
      let entityCreated
      let provider
      if (entity.role === 'user') {
        provider = new MongoUserRepository()
        entityCreated = await provider.createUser(entity as UserEntity)
      } else if (entity.role === 'company') {
        provider = new MongoCompanyRepository()
        entityCreated = await provider.createCompany(entity as CompanyEntity)
      } else if (entity.role === 'admin') {
        provider = new MongoAdminRepository()
        entityCreated = await provider.createAdmin(entity as AdminEntity)
      } else entityCreated = 'No entity created, role does not exist'
      return entityCreated
    } catch (error) {
      // TODO Check If validation errors fit here
      throw new Error(`Error de registro: ${(error as Error).message}`)
    }
  }

  async login (email: string, password: string): Promise<UserEntity | CompanyEntity | AdminEntity | string> {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const userProvider = new MongoUserRepository()
      const userResult = await userProvider.findUser(email, 'email') as UserEntity[]
      if (userResult.length) return userResult[0]
      const companyProvider = new MongoCompanyRepository()
      const companyResult = await companyProvider.findCompany(email, 'email') as CompanyEntity[]
      if (companyResult.length) return companyResult[0]
      const adminProvider = new MongoAdminRepository()
      const adminResult = await adminProvider.findAdmin(email, 'email') as AdminEntity[]
      if (adminResult.length) return adminResult[0]
      return 'User logged but not found on register, contact admin'
    } catch (error) {
      throw new Error(`Error de Inicio de sesión: ${(error as Error).message}`)
    }
  }
}
