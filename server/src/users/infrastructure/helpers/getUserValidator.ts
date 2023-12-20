import { ServerError, UncatchedError } from '../../../errors/errors'
import { type UserUseCase } from '../../aplication/userUseCase'
import { type UserEntity } from '../../domain/user/user.entity'

interface UserQuery {
  id?: string
  name?: string
  email?: string
  technologies?: string
  active?: string
  country?: string
}

export default async function getUserValidator (query: UserQuery, userUseCase: UserUseCase): Promise<UserEntity | UserEntity[] | string> {
  try {
    let user
    if (Object.keys(query).length) {
      const filter = Object.keys(query)[0]
      const value = Object.values(query)[0]
      if (filter.length > 1) throw new ServerError('Combined filters are not valid for user', 'No se permiten filtros combinados para usuarios', 403)
      user = await userUseCase.findUser(value, filter)
    } else {
      user = await userUseCase.findUser('', 'all')
    }
    return user
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'searching user', 'buscar usuario')
  }
}
