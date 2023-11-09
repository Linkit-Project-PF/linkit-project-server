import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
// import User from '../models/User'

export class MongoRepository implements UserRepository {
  async loginUser (email: string, password: string): Promise<UserEntity | string> {
    // const userCreated = await User.create(user)
    return 'Created User'
  }

  async registerUser (user: UserEntity): Promise<UserEntity | string> {
    return 'Resigtser User'
  }

  async deleteUser (uuid: string): Promise<boolean | null> {
    return null
  }

  async findUserById (uuid: string): Promise<UserEntity | string> {
    return 'fined User'
  }

  async editUser (user: UserEntity): Promise<UserEntity | string> {
    return 'edited User'
  }
}
