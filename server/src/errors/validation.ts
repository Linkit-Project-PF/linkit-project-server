import { ValidationError, ConnectionError, NotFoundError, UnauthorizedError, ServiceUnavailableError } from './errors'
import { type UserEntity } from '../users/domain/user.entity'
export const ValidateUserRegister = (user: UserEntity): void => {
  if (!user.name) throw new ValidationError('User name is required')
  if (!user.email) throw new ValidationError('User email is required')
  if (!user.password) throw new ValidationError('User password is required')
  if (!user.role) throw new ValidationError('User role is required')
  if (!user.country) throw new ValidationError('User country is required')
  if (!user.phone) throw new ValidationError('User phone is required')
}

export const ValidateUserLogin = (email: string, password: string): void => {
  if (!email) throw new ValidationError('User email is required')
  if (!password) throw new ValidationError('User password is required')
}
