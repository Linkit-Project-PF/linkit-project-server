import { type UserEntity } from '../users/domain/user.entity'
import { returnUserError, returnConectError } from './returnErrors'

//* USER ERRORS
export const ValidateUserRegister = (user: UserEntity): void => {
  if (!user.name) returnUserError('El nombre es requerido')
  if (!user.email) returnUserError('El email es requerido')
  if (!user.password) returnUserError('La contraseña es requerida')
  if (!user.role) returnUserError('El rol es requerido')
  if (!user.country) returnUserError('El país es requerido')
  if (!user.phone) returnUserError('El teléfono es requerido')
}

export const ValidateUserLogin = (email: string, password: string): void => {
  if (!email) returnUserError('El email es requerido')
  if (!password) returnUserError('La contraseña es requerida')
}

export const ValidateUserUpdate = (user: UserEntity): void => {
  if (!user.name) returnUserError('El nombre es requerido')
  if (!user.email) returnUserError('El email es requerido')
  if (!user.role) returnUserError('El rol es requerido')
  if (!user.country) returnUserError('El país es requerido')
  if (!user.phone) returnUserError('El teléfono es requerido')
}

export const ValidateUserDelete = (_id: string): void => {
  if (!_id) returnUserError('El id es requerido')
}

export const ValidateUserFindById = (id: string): void => {
  if (!id) returnUserError('El id es requerido')
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
