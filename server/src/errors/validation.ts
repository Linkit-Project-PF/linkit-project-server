import { type UserEntity } from '../users/domain/user.entity'
import { returnUserError, returnConectError } from './returnErrors'

//* USER ERRORS
export const ValidateUserRegister = (user: UserEntity): void => {
  if (!user.name) returnUserError('User name is required')
  if (!user.email) returnUserError('User email is required')
  if (!user.password) returnUserError('User password is required')
  if (!user.role) returnUserError('User role is required')
  if (!user.country) returnUserError('User country is required')
  if (!user.phone) returnUserError('User phone is required')
}

export const ValidateUserLogin = (email: string, password: string): void => {
  if (!email) returnUserError('User email is required')
  if (!password) returnUserError('User password is required')
}

export const ValidateUserUpdate = (user: UserEntity): void => {
  if (!user.name) returnUserError('User name is required')
  if (!user.email) returnUserError('User email is required')
  if (!user.role) returnUserError('User role is required')
  if (!user.country) returnUserError('User country is required')
  if (!user.phone) returnUserError('User phone is required')
}

export const ValidateUserDelete = (_id: string): void => {
  if (!_id) returnUserError('User id is required')
}

//* POST ERRORS

//* GENERAL ERRORS

// export const ValidateNotFound = (data: any): void => {
//   if (!data) throw new NotFoundError('Not found')
// }

// export const ValidateUnauthorized = (data: any): void => {
//   if (!data) throw new UnauthorizedError('Unauthorized')
// }

// export const ValidateServiceUnavailable = (data: any): void => {
//   if (!data) throw new ServiceUnavailableError('Service unavailable')
// }

// //* SERVER ERRORS

export const ValidateConnection = (connection: any): void => {
  if (!connection) returnConectError('Connection error')
}

export const ValidateInternalServerError = (data: any): void => {
  if (!data) returnConectError('Internal server error')
}
