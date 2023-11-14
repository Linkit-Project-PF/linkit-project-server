import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUserById: (id: string) => Promise<any>
  findUserByEmail: (email: string) => Promise<UserEntity | string>
  registerUser: (user: UserEntity, type: string) => Promise<UserEntity | string>
  deleteUser: (id: string) => Promise<UserEntity | string>
  loginUser: (email: string, password: string) => Promise<UserEntity | string>
  editUser: (id: string, user: UserEntity) => Promise<UserEntity | string>
  editRoleUser: (id: string) => Promise <UserEntity | string>
}
