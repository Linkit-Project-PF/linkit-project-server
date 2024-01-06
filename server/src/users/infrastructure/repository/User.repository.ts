import { type UserEntity, type MongoUser } from '../../domain/user/user.entity'
import { type UserRepository } from '../../domain/user/user.reposiroty'
import { validateUser, validateUserEdition } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { userMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/userMail'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import User from '../schema/User'
import base from '../../../db/airtable'
import { objectIDValidator } from '../helpers/validateObjectID'
import deletionTrigger from '../helpers/DeletionTrigger'

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
      const userCreated = await User.findByIdAndUpdate(mongoID, { airTableId: airtableUser.getId() }, { new: true })
      await this.mailNodeMailerProvider.sendEmail(userMailCreate(mongoUser as MongoUser))
      return userCreated as UserEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'register user', 'registrar usuario')
    }
  }

  async findUser (value: string, filter: string): Promise<UserEntity | UserEntity[]> {
    try {
      let result
      const validSingleParams = ['email', 'active', 'country']
      const validIncludeFilters = ['technologies']
      if (filter === 'all') result = await User.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'user to search', 'usuario buscado')
        result = await User.findById(value)
        if (!result) throw new ServerError('No user found under that ID', 'No hay un usuario con ese ID', 404)
      } else if (filter === 'name') {
        const allUsers = await User.find()
        const matchedUsers: UserEntity[] = []
        allUsers.forEach(user => {
          const fullName = user.firstName + user.lastName
          if (fullName.includes(value)) matchedUsers.push(user as UserEntity)
        })
        result = matchedUsers
      } else if (validIncludeFilters.includes(filter)) {
        result = await User.find({ [filter]: { $in: [value] } })
      } else if (validSingleParams.includes(filter)) result = await User.find({ [filter]: value })
      else throw new ServerError('Not a valid parameter', 'Parametro de busqueda no valido', 406)
      return result as UserEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching user', 'buscar usuario')
    }
  }

  async editUser (id: string, info: Partial<UserEntity>): Promise<UserEntity> {
    try {
      validateUserEdition(info)
      objectIDValidator(id, 'user to edit', 'usuario a editar')
      const invalidEdit = ['_id', 'role', 'airTableId', 'registeredDate', 'email']
      Object.keys(info).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('No Id/role/date nor email can be changed through this route', 'Ningun ID, rol, fecha o email son editables o no se pueden editar por esta ruta', 403) })
      const editedUser = await User.findByIdAndUpdate(id, info, { new: true })
      if (!editedUser) throw new ServerError('No user found with that ID', 'No se encontro usuario con ese ID', 404)
      return editedUser
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing user', 'editar usuario')
    }
  }

  async deleteUser (id: string, reqID?: string, total?: string): Promise<UserEntity[] | string> {
    try {
      objectIDValidator(id, 'user to delete', 'usuario a eliminar')
      const user = await User.findById(id)
      if (!user) throw new ServerError('No user found with that ID', 'No se encontro usuario con ese ID', 404)
      else {
        if (!total || total === 'false') {
          await User.findByIdAndUpdate(
            id,
            { $set: { active: !user.active } }, { new: true }
          )
          const resultado = await User.find()
          return resultado as UserEntity[]
        } else if (total === 'true') {
          if (reqID !== process.env.SUPERADM_ID) throw new ServerError('Only superadm can delete totally', 'El borrado total solo lo puede hcaer el super admin', 401)
          await deletionTrigger(user.firebaseId as string, user.airTableId as string)
          await User.findByIdAndDelete(id)
        }
        return 'User totally deleted'
      }
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting user', 'eliminar usuario')
    }
  }
}
