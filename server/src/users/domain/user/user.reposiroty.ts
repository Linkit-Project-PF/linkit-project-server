import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUser: (value: string, filter: string) => Promise<UserEntity | UserEntity[]>
  createUser: (user: UserEntity) => Promise<UserEntity>
  deleteUser: (id: string, reqID?: string, total?: string) => Promise<UserEntity | string>
  editUser: (id: string, user: UserEntity) => Promise<UserEntity[]>
}
