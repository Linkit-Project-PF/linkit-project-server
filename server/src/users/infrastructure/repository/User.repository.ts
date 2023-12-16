import { type UserEntity } from '../../domain/user/user.entity'
import { type UserRepository } from '../../domain/user/user.reposiroty'
import { validateUser } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { userMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/userMail'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import User from '../schema/User'
import base from '../../../db/airtable'
import CombinedFilters from '../helpers/CombinedFilters'
import { objectIDValidator } from '../helpers/validateObjectID'

export class MongoUserRepository implements UserRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {}

  async createUser (user: UserEntity): Promise<UserEntity> {
    try {
      await validateUser(user)
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
          result = await User.find({ [filter as string]: { $in: [value] } })
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
      const editedUser = await User.findByIdAndUpdate(id, info, { new: true })
      if (!editedUser) throw new ServerError('No user found with that ID', 'No se encontro usuario con ese ID', 404)
      return editedUser as UserEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing user', 'editar usuario')
    }
  }

  async deleteUser (id: string, total?: string): Promise<UserEntity | string> {
    try {
      objectIDValidator(id, 'user to delete', 'usuario a eliminar')
      const user = await User.findById(id)
      if (!user) throw new ServerError('No user found with that ID', 'No se encontro usuario con ese ID', 404)
      else {
        if (!total || total === 'false') {
          const resultado = await User.findByIdAndUpdate(
            id,
            { $set: { active: !user.active } }, { new: true }
          )
          return resultado as UserEntity
        } else if (total === 'true') {
          await User.findByIdAndDelete(id) // TODO Add here trigger that erases postulations user is involved.
        }
        return 'User totally deleted, including postulations from the user'
      }
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting user', 'eliminar usuario')
    }
  }
}
