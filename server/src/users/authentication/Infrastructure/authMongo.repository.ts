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
import Admin from '../../infrastructure/schema/Admin'
import User from '../../infrastructure/schema/User'
import Company from '../../infrastructure/schema/Company'
import { MongoUserRepository } from '../../infrastructure/repository/User.repository'
import { MongoCompanyRepository } from '../../infrastructure/repository/Company.repository'
import { MongoAdminRepository } from '../../infrastructure/repository/Admin.repository'
import { objectIDValidator } from '../../infrastructure/helpers/validateObjectID'
import { type MailNodeMailerProvider } from './nodemailer/nodeMailer'
import { ValidateUserRegister, validateIfEmailExists } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'

export type CustomType = UserEntity | CompanyEntity | AdminEntity

export class AuthMongoRepository implements AuthRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {
    this.mailNodeMailerProvider = mailNodeMailerProvider
  }

  async register (entity: CustomType): Promise<UserEntity | CompanyEntity | AdminEntity | string> {
    try {
      await validateIfEmailExists(entity.email)
      ValidateUserRegister(entity)
      await createUserWithEmailAndPassword(auth, String(entity.email), entity.password ? String(entity.password) : '')
      let entityCreated
      let provider
      if (entity.role === 'user') {
        provider = new MongoUserRepository(this.mailNodeMailerProvider)
        entityCreated = await provider.createUser(entity as UserEntity)
      } else if (entity.role === 'company') {
        provider = new MongoCompanyRepository(this.mailNodeMailerProvider)
        entityCreated = await provider.createCompany(entity as CompanyEntity)
      } else if (entity.role === 'admin') {
        provider = new MongoAdminRepository(this.mailNodeMailerProvider)
        entityCreated = await provider.createAdmin(entity as AdminEntity)
      } else entityCreated = 'No entity created, role does not exist'
      return entityCreated
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'register', 'registrar entidad')
    }
  }

  async login (email: string, password: string, role: string): Promise<UserEntity | CompanyEntity | AdminEntity> {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (role === 'user') {
        const result1 = await User.find({ email })
        const result2 = await Admin.find({ email })
        if (result1.length) return result1[0] as UserEntity
        if (result2.length) return result2[0] as AdminEntity
      } else if (role === 'company') {
        const result = await Company.find({ email })
        if (result.length) return result[0] as CompanyEntity
      } else throw new ServerError('Provide a valid role for login', 'Debes brindar un rol valido para iniciar sesion', 406)
      throw new ServerError(`${role} not found, please be sure you are using the right login for your role`, `${role} no encontrado, asegurate que estas iniciando sesion desde la seccion correcta`, 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'signin in', 'iniciar sesion')
    }
  }

  async verify (id: string, role: string): Promise<string> {
    try {
      if (id === 'undefined' || role === 'undefined') throw new ServerError('Missing user information', 'Falta informacion del usuario', 406)
      objectIDValidator(id, 'user to verify', 'usuario a verificar')
      if (role === 'user') {
        const user = await User.findById(id)
        if (!user) throw new ServerError('No User found with that id', 'No se encuentra un usuario con ese ID', 404)
        await User.updateOne({ _id: user._id }, { $set: { active: true } }, { new: true })
      } else if (role === 'company') {
        const company = await Company.findById(id)
        if (!company) throw new ServerError('No Company found with that id', 'No se encuentra una empresa con ese ID', 404)
        await Company.updateOne({ email: company.email }, { $set: { active: true } }, { new: true })
      } else {
        throw new ServerError('Not a valid role', 'El rol no es valido', 409)
      }
      return 'Completed'
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'verifying', 'verificar usuario')
    }
  }
}
