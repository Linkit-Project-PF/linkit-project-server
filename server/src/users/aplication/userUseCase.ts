//* caso de uso de usuario seria toda la logica

import { type UserEntity } from '../domain/user.entity'
import { type UserRepository } from '../domain/user.reposiroty'
import { UserValue } from '../domain/user.value'

export class UserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async registerUser (user: UserEntity): Promise<UserEntity | null> {
    const userValue = new UserValue(user)
    const userCreated = await this.userRepository.registerUser(userValue)
    return userCreated
  }
}
