//* interefaz que hace referencia a los metodos que vamos a implementar

import { type UserEntity } from './user.entity'

export interface UserRepository {
  findUserById: (uuid: string) => Promise<UserEntity> | null
  registerUser: (user: UserEntity) => Promise<UserEntity> | null
  deleteUser: (uuid: string) => Promise<boolean>
}
