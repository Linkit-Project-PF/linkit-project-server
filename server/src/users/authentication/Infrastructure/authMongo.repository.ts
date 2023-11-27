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
// import { type MailNodeMailerProvider } from './nodemailer/nodeMailer'
// import { docMail } from './nodemailer/docMail'

export class AuthMongoRepository implements AuthRepository {
  // constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {
  //   this.mailNodeMailerProvider = mailNodeMailerProvider
  // }

  async register (entity: UserEntity | CompanyEntity | AdminEntity): Promise<UserEntity | CompanyEntity | AdminEntity | string> {
    try {
      // TODO Add Email and Password validator so Mongo can be done before firebase
      await createUserWithEmailAndPassword(auth, String(entity.email), entity.password ? String(entity.password) : '')
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
      // await this.mailNodeMailerProvider.sendEmail({
      //   to: {
      //     name: entity.name,
      //     email: entity.email
      //   },
      //   from: {
      //     name: 'LinkIT',
      //     email: 'linkit.project.henry@gmail.com'
      //   },
      //   subject: 'Bienvenido a LinkIT',
      //   html: docMail
      // }
      // )
      return entityCreated
    } catch (error) {
      // TODO Check If validation errors fit here
      throw new Error(`Error de registro: ${(error as Error).message}`)
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
      } else throw Error('Provide a valid role for login')
      throw Error(`${role} not found, please be sure you are using the right login for your role`)
    } catch (error) {
      throw new Error(`Error de Inicio de sesión: ${(error as Error).message}`)
    }
  }

  async verify (id: string, role: string): Promise<string> {
    try {
      if (id === 'undefined' || role === 'undefined') throw Error('Missing user information')
      objectIDValidator(id, 'user to verify')
      if (role === 'user') {
        const user = await User.findById(id)
        if (!user) throw Error('No User found with that id.')
        await User.updateOne({ _id: user._id }, { $set: { active: true } }, { new: true })
      } else if (role === 'company') {
        const company = await Company.findById(id)
        if (!company) throw Error('No Company found with that id.')
        await Company.updateOne({ email: company.email }, { $set: { active: true } }, { new: true })
      } else {
        throw Error('Not a valid role')
      }
      return 'Completed'
    } catch (error: any) {
      throw Error('Error verifying: ' + error.message)
    }
  }
}
