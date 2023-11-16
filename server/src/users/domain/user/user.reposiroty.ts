import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUser: (value: string, filter: string) => Promise<UserEntity | UserEntity[] | string>
  createUser: (user: UserEntity) => Promise<UserEntity | string>
  deleteUser: (id: string) => Promise<UserEntity | string>
  editUser: (id: string, user: UserEntity) => Promise<UserEntity | string>
}
