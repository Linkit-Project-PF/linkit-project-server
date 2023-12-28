import { type UserEntity, type MongoUser } from '../../domain/user/user.entity'
import { type UserRepository } from '../../domain/user/user.reposiroty'
import { validateUser } from '../../../errors/validation'
import { updatePassword } from 'firebase/auth'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { userMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/userMail'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import User from '../schema/User'
import base from '../../../db/airtable'
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
          if (fullName.includes(value)) matchedUsers.push(user)
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

  async editUser (id: string, info: any): Promise<UserEntity[]> {
    try {
      objectIDValidator(id, 'user to edit', 'usuario a editar')
      const invalidEdit = ['_id', 'role', 'airTableId', 'registeredDate', 'email']
      Object.keys(info).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('Unable to edit: _id, role, airtableID, registeredDate, email', 'Ningun ID, rol, fecha o email puede editarse por aqui', 403) })
      const editedUser = await User.findByIdAndUpdate(id, info, { new: true })
      if (!editedUser) throw new ServerError('No user found with that ID', 'No se encontro usuario con ese ID', 404)
      const allUsers = await User.find()
      return allUsers
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing user', 'editar usuario')
    }
  }

  async deleteUser (id: string, reqID?: string, total?: string): Promise<UserEntity | string> {
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
          if (reqID !== process.env.SUPERADM_ID) throw new ServerError('Only superadm can delete totally', 'El borrado total solo lo puede hcaer el super admin', 401)
          await User.findByIdAndDelete(id)
        }
        return 'User totally deleted'
      }
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting user', 'eliminar usuario')
    }
  }

  async changePassword (user: any, password: string): Promise<void> {
    try {
      const newPassword = password
      await updatePassword(user, newPassword)
    } catch (error: any) {
      console.log(error)
    }
  }
}
