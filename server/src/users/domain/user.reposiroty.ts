//* interefaz que hace referencia a los metodos que vamos a implementar

import { type UserEntity } from "./user.entity";

export interface UserRepository {
  findUserById: (uuid: string) => Promise<UserEntity | string>;
  registerUser: (user: UserEntity) => Promise<UserEntity | string>;
  deleteUser: (uuid: string) => Promise<boolean | null>;
}
