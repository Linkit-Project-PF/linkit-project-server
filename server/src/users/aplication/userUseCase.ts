import { type UserEntity } from '../domain/user.entity'
import { type UserRepository } from '../domain/user.reposiroty'
import { UserValue } from '../domain/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public registerUser = async (
    user: UserEntity
    , type: string): Promise<UserEntity | string> => {
    const newUser = new UserValue(user)
    const userCreated = await this.userRepository.registerUser(newUser, type)
    return userCreated
  }

  public findUserById = async (uuid: string): Promise<UserEntity | string> => {
    const user = await this.userRepository.findUserById(uuid)
    return user
  }

  public loginUser = async (email: string, password: string): Promise<UserEntity | string> => {
    const user = await this.userRepository.loginUser(email, password)
    return user
  }

  public editUser = async (id: string, user: UserEntity): Promise<UserEntity | string> => {
    const editUser = await this.userRepository.editUser(id, user)
    return editUser
  }

  public editRoleUser = async (id: string): Promise<UserEntity | string> => {
    const editRolUser = await this.userRepository.editRoleUser(id)
    return editRolUser
  }

  public deleteUser = async (id: string): Promise<UserEntity | string> => {
    const deleteUser = await this.userRepository.deleteUser(id)
    return deleteUser
  }
}
