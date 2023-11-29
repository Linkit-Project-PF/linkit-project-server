import { type UserEntity } from '../domain/user/user.entity'
import { type UserRepository } from '../domain/user/user.reposiroty'
import { UserValue } from '../domain/user/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public createUser = async (user: UserEntity): Promise<UserEntity | string> => {
    const newUser = new UserValue(user)
    const userCreated = await this.userRepository.createUser(newUser)
    return userCreated
  }

  public findUser = async (value: string | string[], filter: string | string[], combined?: boolean): Promise<UserEntity | UserEntity[] | string> => {
    const user = await this.userRepository.findUser(value, filter, combined)
    return user
  }

  public editUser = async (id: string, user: UserEntity): Promise<UserEntity | string> => {
    const editUser = await this.userRepository.editUser(id, user)
    return editUser
  }

  public deleteUser = async (id: string): Promise<UserEntity | string> => {
    const deleteUser = await this.userRepository.deleteUser(id)
    return deleteUser
  }

  public relateJd = async (userID: string, jdID: string, status: string, operation: string): Promise<UserEntity> => {
    const userRelated = await this.userRepository.relateJd(userID, jdID, status, operation)
    return userRelated
  }
}
