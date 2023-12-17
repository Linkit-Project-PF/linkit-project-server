import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUser: (value: string[] | string, filter: string | string[], combined?: boolean) => Promise<UserEntity | UserEntity[] | string>
  createUser: (user: UserEntity) => Promise<UserEntity | string>
  deleteUser: (id: string, total?: string) => Promise<UserEntity | string>
  editUser: (id: string, user: UserEntity) => Promise<UserEntity | string>
}
