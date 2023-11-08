//* interefaz que hace referencia a los metodos que vamos a implementar

import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUserById: (uuid: string) => Promise<UserEntity | string>
  loginUser: (email: string, password: string) => Promise<string | null>
  registerUser: (user: UserEntity) => Promise<UserEntity | string>
  deleteUser: (uuid: string) => Promise<boolean | null>
}
