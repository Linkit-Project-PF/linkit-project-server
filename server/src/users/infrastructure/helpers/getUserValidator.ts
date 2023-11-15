import { type UserUseCase } from '../../aplication/userUseCase'
import { type UserEntity } from '../../domain/user.entity'

interface UserQuery {
  name?: string
  email?: string
  technology?: string
  active?: string
  password?: string
  login?: string
}

export default async function getUserValidator (query: UserQuery, userUseCase: UserUseCase): Promise<UserEntity | UserEntity[] | string> {
  try {
    let user
    if (Object.keys(query).length) {
      if (!query.login) {
        const filter: string = Object.keys(query)[0]
        const value: string = Object.values(query)[0]
        user = await userUseCase.findUser(value, filter)
      } else {
        user = await userUseCase.loginUser(String(query.email), String(query.password))
      }
    } else {
      user = await userUseCase.findUser('', 'all')
    }
    return user
  } catch (error: any) {
    throw Error(error)
  }
}
