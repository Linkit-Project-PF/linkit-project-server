import { ServerError, UncatchedError } from '../../../errors/errors'
import { type UserUseCase } from '../../aplication/userUseCase'
import { type UserEntity } from '../../domain/user/user.entity'

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
    const filters = Object.keys(query)
    const values = Object.values(query)
    if (filters.length) {
      if (filters.length === 1) {
        user = await userUseCase.findUser(values[0], filters[0])
      } else {
        user = await userUseCase.findUser(values, filters, true)
      }
    } else {
      user = await userUseCase.findUser('', 'all')
    }
    return user
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'searching user', 'buscar usuario')
  }
}
