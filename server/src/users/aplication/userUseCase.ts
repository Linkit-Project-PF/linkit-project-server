//* caso de uso de usuario seria toda la logica

import { type UserEntity } from '../domain/user.entity'
import { type UserRepository } from '../domain/user.reposiroty'
import { UserValue } from '../domain/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public registerUser = async (
    user: UserEntity
  ): Promise<UserEntity | string> => {
    const newUser = new UserValue(user)
    const userCreated = await this.userRepository.registerUser(newUser)
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
}
