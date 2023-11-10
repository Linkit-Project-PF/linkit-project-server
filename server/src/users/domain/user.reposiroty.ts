import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUserById: (id: string) => Promise<UserEntity | string>
  registerUser: (user: UserEntity, type: string) => Promise<UserEntity | string>
  deleteUser: (id: string) => Promise<boolean | null>
  loginUser: (email: string, password: string) => Promise<UserEntity | string>
  editUser: (user: UserEntity) => Promise<UserEntity | string>
}
