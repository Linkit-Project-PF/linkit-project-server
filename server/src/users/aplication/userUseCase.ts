import { type UserEntity } from '../domain/user/user.entity'
import { type UserRepository } from '../domain/user/user.reposiroty'
import { UserValue } from '../domain/user/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public createUser = async (user: UserEntity): Promise<UserEntity> => {
    const newUser = new UserValue(user)
    const userCreated = await this.userRepository.createUser(newUser)
    return userCreated
  }

  public findUser = async (value: string, filter: string): Promise<UserEntity | UserEntity[]> => {
    const user = await this.userRepository.findUser(value, filter)
    return user
  }

  public editUser = async (id: string, user: UserEntity): Promise<UserEntity> => {
    const editUser = await this.userRepository.editUser(id, user)
    return editUser
  }

  public deleteUser = async (id: string, reqID?: string, total?: string): Promise<UserEntity[]> => {
    const deleteUser = await this.userRepository.deleteUser(id, reqID, total)
    return deleteUser
  }
}
