import { type UserEntity } from '../../domain/user/user.entity'
import { type UserRepository } from '../../domain/user/user.reposiroty'
import { ValidateUserRegister, validateIfEmailExists } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { userMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/userMail'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import User from '../schema/User'
import base from '../../../db/airtable'
import CombinedFilters from '../helpers/CombinedFilters'
import { objectIDValidator } from '../helpers/validateObjectID'
import Jd from '../../../posts/infrastructure/schema/Jd'

export class MongoUserRepository implements UserRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {}

  async createUser (user: UserEntity): Promise<UserEntity> {
    try {
      await validateIfEmailExists(user.email)
      ValidateUserRegister(user)
      const mongoUser = await User.create(user)
      const mongoID = String(mongoUser._id)
      const airtableUser = await base('UsersInfo').create({
        Nombre: user.firstName,
        Apellido: user.lastName,
        Email: user.email,
        Rol: user.role,
        WebID: mongoID
      })
      await this.mailNodeMailerProvider.sendEmail(userMailCreate(user))
      const userCreated = await User.findByIdAndUpdate(mongoID, { airTableId: airtableUser.getId() }, { new: true })
      return userCreated as UserEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'register user', 'registrar usuario')
    }
  }

  async deleteUser (id: string): Promise<UserEntity | string> {
    try {
      objectIDValidator(id, 'user to delete', 'usuario a eliminar')
      const resultado = await User.findByIdAndUpdate(
        id,
        { $set: { active: false } }, { new: true }
      )
      return resultado as UserEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting user', 'eliminar usuario')
    }
  }

  async findUser (value: string[] | string, filter: string[] | string, combined?: boolean): Promise<UserEntity | UserEntity[]> {
    try {
      let result
      const validSingleParams = ['name', 'email', 'active', 'country', 'userStatus', 'internStatus']
      const validIncludeFilters = ['technologies', 'postulations']
      if (!combined) {
        if (filter === 'all') result = await User.find()
        else if (filter === 'id') {
          objectIDValidator(value as string, 'user to search', 'usuario buscado')
          result = await User.findById(value)
          if (!result) throw new ServerError('No user found under that ID', 'No hay un usuario con ese ID', 404)
        } else if (validIncludeFilters.includes(filter as string)) {
          result = (await User.find()).filter(user => (user as any)[filter as string].includes(value))
        } else if (validSingleParams.includes(filter as string)) result = await User.find({ [filter as string]: value })
        else throw new ServerError('Not a valid parameter', 'Parametro de busqueda no valido', 406)
      } else {
        result = CombinedFilters(filter as string[], value as string[], validSingleParams, validIncludeFilters, 'user')
      }
      return result as UserEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching user', 'buscar usuario')
    }
  }

  async editUser (id: string, info: any): Promise<UserEntity> {
    try {
      objectIDValidator(id, 'user to edit', 'usuario a editar')
      const invalidEdit = ['_id', 'role', 'airTableId', 'postulations', 'registeredDate']
      Object.keys(info).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('ID/airtableID/role/date or postulations cannot be changed through this route', 'Ningun ID, rol, fecha o postulaciones puede editarse por aqui', 403) })
      const editedUser = await User.findByIdAndUpdate(id, info, { new: true }) //! Check what happens if no user here
      return editedUser as UserEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing user', 'editar usuario')
    }
  }

  async editRoleUser (id: string): Promise <UserEntity> {
    try {
      objectIDValidator(id, 'user to edit', 'usuario a editar')
      const result = await User.findByIdAndUpdate(
        id,
        { role: 'admin' }, { new: true }
      ) //! Check what happens if no user here
      return result as UserEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing user', 'editar usuario')
    }
  }

  async relateJd (userID: string, jdID: string, status: string, operation: string): Promise<UserEntity> {
    try {
      if (!status || !operation || !userID || !jdID) throw Error('Missing parameters: operation, user, jd and status needed')
      objectIDValidator(userID, 'user to relate', 'usuario a relacionar')
      objectIDValidator(jdID, 'jd in relation', 'vacante a relacionar')
      const jd = await Jd.findById(jdID, '_id')
      if (!jd) throw Error('Job Description does not exist')
      const user = await User.findById(userID)
      if (!user) throw Error('User does not exist')
      if (operation === 'create') {
        user.postulations.forEach(obj => { if (obj.jd === jdID) throw Error('Jd already related to this user') })
        const objectToAdd = { jd: jd._id, status }
        user.postulations.push(objectToAdd)
      } else if (operation === 'status') {
        let existing = false
        let index
        user.postulations.forEach((obj, idx) => { if (String(obj.jd) === jdID) { existing = true; index = idx } })
        if (!existing || typeof index === 'undefined') throw Error('JD is not related to this user')
        if (status === user.postulations[index].status) throw Error('Status is the same as the previous one')
        user.postulations[index].status = status
      } else if (operation === 'delete') {
        let existing = false
        let index
        user.postulations.forEach((obj, idx) => { if (String(obj.jd) === jdID) { existing = true; index = idx } })
        if (!existing || typeof index === 'undefined') throw Error('JD is not related to this user')
        user.postulations.splice(index, 1)
      } else throw Error('Not a valid operation')
      const replacedUser = await User.findOneAndReplace({ _id: userID }, user, { new: true })
      return replacedUser as UserEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'relating user', 'relacionar usuario')
    }
  }
}
