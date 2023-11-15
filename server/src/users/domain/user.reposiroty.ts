import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUser: (value: string, filter: string) => Promise<UserEntity | UserEntity[] | string>
  registerUser: (user: UserEntity, type: string) => Promise<UserEntity | string>
  deleteUser: (id: string) => Promise<UserEntity | string>
  loginUser: (email: string, password: string) => Promise<UserEntity | string>
  editUser: (id: string, user: UserEntity) => Promise<UserEntity | string>
}
