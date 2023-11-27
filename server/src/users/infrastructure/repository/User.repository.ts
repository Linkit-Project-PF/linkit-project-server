import { type UserEntity } from '../../domain/user/user.entity'
import { type UserRepository } from '../../domain/user/user.reposiroty'
import { validateIfEmailExists } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import User from '../collections/User'
import base from '../../../db/airtable'
import CombinedFilters from '../helpers/CombinedFilters'
import { objectIDValidator } from '../helpers/validateObjectID'

export class MongoUserRepository implements UserRepository {
  async createUser (user: UserEntity): Promise<UserEntity> {
    try {
      await validateIfEmailExists(user.email, 'user')
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
      throw new ValidationError(`Error on register: ${(error as Error).message}`)
    }
  }

  async deleteUser (id: string): Promise<UserEntity | string> {
    try {
      objectIDValidator(id, 'user to delete')
      const resultado = await User.findByIdAndUpdate(
        id,
        { $set: { active: false } }, { new: true }
      )
      return resultado as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error on delete: ${(error as Error).message}`)
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
          objectIDValidator(value as string, 'user to search')
          result = await User.findById(value)
        } else if (validIncludeFilters.includes(filter as string)) {
          result = (await User.find()).filter(user => (user as any)[filter as string].includes(value))
        } else if (validSingleParams.includes(filter as string)) result = await User.find({ [filter as string]: value })
        else throw Error('Not a valid parameter')
      } else {
        result = CombinedFilters(filter as string[], value as string[], validSingleParams, validIncludeFilters, 'user')
      }
      return result as UserEntity
    } catch (error) {
      throw new ValidationError(`Error searching: ${(error as Error).message}`)
    }
  }

  async editUser (id: string, info: any): Promise<UserEntity> {
    try {
      objectIDValidator(id, 'user to edit')
      const editedUser = await User.findByIdAndUpdate(id, info, { new: true })
      return editedUser as UserEntity
    } catch (error) {
      throw new ValidationError(`Error when editing user: ${(error as Error).message}`)
    }
  }

  async editRoleUser (id: string): Promise <UserEntity> {
    try {
      objectIDValidator(id, 'user to edit')
      const result = await User.findByIdAndUpdate(
        id,
        { role: 'admin' }, { new: true }
      )
      return result as UserEntity
    } catch (error) {
      throw new ValidationError(`Error trying to edit user role: ${(error as Error).message}`)
    }
  }
}
