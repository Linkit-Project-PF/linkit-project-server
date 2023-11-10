import { type UserEntity } from './user.entity'
import { type Types } from 'mongoose'

export interface UserRepository {
  findUserById: (id: string) => Promise<UserEntity | string>
  registerUser: (user: UserEntity, type: string) => Promise<UserEntity | string>
  deleteUser: (_id: Types.ObjectId | null) => Promise<boolean | null>
  loginUser: (email: string, password: string) => Promise<UserEntity | string>
  editUser: (user: UserEntity) => Promise<UserEntity | string>
}
