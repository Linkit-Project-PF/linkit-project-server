import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'

export class AirtableRepository implements UserRepository {
  async loginUser (email: string, password: string): Promise<UserEntity | string> {
    return 'TESTING'
  }

  async registerUser (user: UserEntity): Promise<UserEntity | string> {
    return 'TESTING'
  }

  async editUser (user: UserEntity): Promise<UserEntity | string> {
    return 'Not implemented'
  }

  //! delete in construction
  async deleteUser (uuid: string): Promise<boolean> {
    return false
  }

  //! find in construction
  async findUserById (uuid: string): Promise<UserEntity | string> {
    return 'Not implemented'
  }
}
