import { type UserEntity } from '../../domain/user/user.entity'
import { type UserRepository } from '../../domain/user/user.reposiroty'
import { ValidateUserDelete, ValidateUserUpdate, ValidateId } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import User from '../collections/User'
import base from '../../../db/airtable'
import CombinedFilters from '../helpers/CombinedFilters'

export class MongoUserRepository implements UserRepository {
  async createUser (user: UserEntity): Promise<UserEntity | string> {
    try {
      // TODO: Add ValidateUserIfAlreadyonDB
      const mongoUser = await User.create(user)
      const mongoID = String(mongoUser._id)
      const airtableUser = await base('UsersInfo').create({
        Nombre: user.name.split(' ')[0],
        Apellido: user.name.split(' ')[1],
        Email: user.email,
        Rol: user.role,
        WebID: mongoID
      })
      const userCreated = await User.findByIdAndUpdate(mongoID, { airTableId: airtableUser.getId() }, { new: true })
      return userCreated as UserEntity
    } catch (error: any) {
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async deleteUser (id: string): Promise<UserEntity | string> {
    try {
      ValidateUserDelete(id)
      const resultado = await User.findByIdAndUpdate(
        id,
        { $set: { active: false } }, { new: true }
      )
      return resultado as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }

  async findUser (value: string[] | string, filter: string[] | string, combined?: boolean): Promise<UserEntity | UserEntity[] | string> {
    try {
      let result
      const validSingleParams = ['name', 'email', 'active', 'country', 'userStatus', 'internStatus']
      const validIncludeFilters = ['technologies', 'postulations']
      if (!combined) {
        if (filter === 'all') result = await User.find()
        else if (filter === 'id') result = await User.findById(value)
        else if (validIncludeFilters.includes(filter as string)) {
          result = (await User.find()).filter(user => (user as any)[filter as string].includes(value))
        } else if (validSingleParams.includes(filter as string)) result = await User.find({ [filter as string]: value })
        else throw Error('Not a valid parameter')
      } else {
        result = CombinedFilters(filter as string[], value as string[], validSingleParams, validIncludeFilters, 'user')
      }
      return result as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al buscar: ${(error as Error).message}`)
    }
  }

  async editUser (id: string, user: UserEntity): Promise<UserEntity | string> {
    try {
      ValidateUserUpdate(user)
      const editedUser = await User.findByIdAndUpdate(id, user, { new: true })
      return editedUser as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al editar: ${(error as Error).message}`)
    }
  }

  async editRoleUser (id: string): Promise <UserEntity | string> {
    try {
      ValidateUserDelete(id)
      ValidateId(id)
      const result = await User.updateOne(
        { id },
        { $set: { role: 'admin' } }
      )
      return result as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al intentar cambiar el rol del usuario: ${(error as Error).message}`)
    }
  }
}
