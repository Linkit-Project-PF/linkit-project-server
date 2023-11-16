/* eslint-disable indent */
import { type UserEntity } from '../../domain/user/user.entity'
import { type UserRepository } from '../../domain/user/user.reposiroty'
import { ValidateUserDelete, ValidateUserUpdate, ValidateId } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import User from '../collections/User'

export class MongoUserRepository implements UserRepository {
  async createUser (user: UserEntity): Promise<UserEntity | string> {
    try {
      // TODO: Add ValidateUserIfAlreadyonDB
      const userCreated = await User.create(user)
      return userCreated as UserEntity
    } catch (error: any) {
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async deleteUser (id: string): Promise<UserEntity | string> {
    try {
      ValidateUserDelete(id)
      const resultado = await User.updateOne(
        { id },
        { $set: { active: false } }
      )
      return resultado as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }

  async findUser (value: string, filter: string): Promise<UserEntity | UserEntity[] | string> {
    try {
      let result
      switch (filter) {
        case 'id':
          result = await User.findById(value)
          break
        case 'name':
          result = await User.find({ name: value })
          break
        case 'email':
          result = await User.find({ email: value })
          break
        case 'active':
          result = await User.find({ active: value })
          break
        case 'tech':
          result = (await User.find()).filter(user => user.technologies.includes(value))
          break
        case 'all':
          result = await User.find()
          break
        default:
          result = 'Not a valid parameter'
          break
      }
      return result as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al buscar: ${(error as Error).message}`)
    }
  }

  async editUser (id: string, user: UserEntity): Promise<UserEntity | string> {
    try {
      ValidateUserUpdate(user)
      const editedUser = await User.findByIdAndUpdate(id, user)
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
