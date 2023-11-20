import { type UserUseCase } from '../../../aplication/userUseCase'
import { type UserEntity } from '../../../domain/user/user.entity'

interface UserQuery {
  id?: string
  name?: string
  email?: string
  technology?: string
  active?: string
}

export default async function getUserValidator (query: UserQuery, userUseCase: UserUseCase): Promise<UserEntity | UserEntity[] | string> {
  try {
    let user
    if (Object.keys(query).length) {
      const filter: string = Object.keys(query)[0]
      const value: string = Object.values(query)[0]
      user = await userUseCase.findUser(value, filter)
    } else {
      user = await userUseCase.findUser('', 'all')
    }
    return user
  } catch (error: any) {
    throw Error(error)
  }
}
