import { type UserEntity } from '../users/domain/user/user.entity'
import { type AdminEntity } from '../users/domain/admin/admin.entity'
import { type PostEntity } from '../posts/domain/post/post.entity'
import { type JdEntity } from '../posts/domain/jd/jd.entity'
import Admin from '../users/infrastructure/collections/Admin'
import User from '../users/infrastructure/collections/User'
import Company from '../users/infrastructure/collections/Company'
import { returnUserError, returnConectError, returnPostError } from './returnErrors'

//* USER ERRORS
export const ValidateCompanyIfAlreadyonDB = async (email: string): Promise<void> => {
  const allCompanies = await Company.find({}, 'email')
  allCompanies.forEach(obj => {
    if (obj.email === email) returnUserError('Este email ya esta en uso')
  })
}

export const ValidateAdminIfAlreadyonDB = async (email: string): Promise<void> => {
  const allAdmins = await Admin.find({}, 'email')
  allAdmins.forEach(obj => {
    if (obj.email === email) returnUserError('Este email ya esta en uso')
  })
}

export const ValidateUserIfAlreadyonDB = async (email: string): Promise<void> => {
  const allUsers = await User.find({}, 'email')
  allUsers.forEach(obj => {
    if (obj.email === email) returnUserError('Este email ya esta en uso')
  })
}
export const ValidateUserRegister = (user: UserEntity | AdminEntity): void => {
  if (!user.name) returnUserError('El nombre es requerido')
  if (!user.email) returnUserError('El email es requerido')
  if (!user.password) returnUserError('La contraseña es requerida')
  if (!user.role) returnUserError('El rol es requerido')
  if (!user.country) returnUserError('El país es requerido')
  if (!user.phone) returnUserError('El teléfono es requerido')
}

export const ValidateUserLogin = (email: string, password: string): void => {
  if (email === 'undefined' || password === 'undefined') returnUserError('Credenciales requeridas')
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

export const ValidateId = (_id: string): void => {
  if (_id === 'id super admin') returnUserError('Acción inválida, no se puede cambiar el rol del Administrador')
}

export const ValidateUserFindById = (id: string): void => {
  if (!id) returnUserError('El id es requerido')
}

//* POST ERRORS

export const ValidatePostCreate = (post: PostEntity): void => {
  if (!post.title) returnPostError('El título es requerido')
  if (!post.description) returnPostError('La descripción es requerida')
  if (!post.input) returnPostError('El tipo de posteo es requerido')
}

export const ValidateJdCreate = (jd: JdEntity): void => {
  if (!jd.title) returnPostError('El título es requerido')
  if (!jd.description) returnPostError('La descripción es requerida')
}

export const ValidatePostUpdate = (post: PostEntity): void => {
  if (!post.title) returnPostError('El título es requerido')
  if (!post.description) returnPostError('La descripción es requerida')
  if (!post.type) returnPostError('El tipo de posteo es requerido')
}

export const ValidateJdUpdate = (jd: JdEntity): void => {
  if (!jd.title) returnPostError('El título es requerido')
  if (!jd.description) returnPostError('La descripción es requerida')
}

export const ValidatePostDelete = (_id: string): void => {
  if (!_id) returnPostError('El id es requerido')
}

export const ValidatePostFindByType = (type: string): void => {
  if (!type) returnPostError('El tipo es requerido')
}

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
