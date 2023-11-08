import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUserById: (uuid: string) => Promise<UserEntity | string>
  registerUser: (user: UserEntity) => Promise<UserEntity | string>
  deleteUser: (uuid: string) => Promise<boolean | null>
  loginUser: (email: string, password: string) => Promise<UserEntity | string>
  editUser: (user: UserEntity) => Promise<UserEntity | string>
}
