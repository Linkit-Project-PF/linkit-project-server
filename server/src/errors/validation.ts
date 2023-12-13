import { type UserEntity } from '../users/domain/user/user.entity'
import { type AdminEntity } from '../users/domain/admin/admin.entity'
import { type PostEntity } from '../posts/domain/post/post.entity'
import { type JdEntity } from '../posts/domain/jd/jd.entity'
import { type ReviewEntity } from '../posts/domain/review/review.entity'
import Admin from '../users/infrastructure/schema/Admin'
import User from '../users/infrastructure/schema/User'
import Company from '../users/infrastructure/schema/Company'
import Review from '../posts/infrastructure/schema/Review'
import { returnUserError, returnConectError, returnPostError } from './returnErrors'
import Jd from '../posts/infrastructure/schema/Jd'

//* USER ERRORS
export const validateIfEmailExists = async (email: string): Promise<void> => {
  const result1 = await User.find({ email })
  const result2 = await Admin.find({ email })
  const result3 = await Company.find({ email })
  const result = [...result1, ...result2, ...result3]
  if (result.length) throw Error('This email is already registered')
}

export const ValidateReviewIfAlreadyonDB = async (name: string): Promise<void> => {
  const allReviews = await Review.find({}, 'name')
  allReviews.forEach(obj => {
    if (obj.name === name) returnUserError('Esta empresa o usuario ya tiene una reseña')
  })
}

export const validateIfJdCodeExists = async (code: string): Promise<void> => {
  const allJds = await Jd.find({}, 'code')
  allJds.forEach(jd => {
    if (jd.code === code) throw Error('There is JobDescription with that same code already created.')
  })
}

export const ValidateUserRegister = (user: UserEntity | AdminEntity): void => {
  if (!user.firstName || !user.lastName) returnUserError('El nombre es requerido')
  if (!user.email) returnUserError('El email es requerido')
  if (!user.role) returnUserError('El rol es requerido')
  if (!user.country) returnUserError('El país es requerido')
}

export const ValidateUserLogin = (email: string, password: string): void => {
  if (email === 'undefined' || password === 'undefined') returnUserError('Credenciales requeridas')
  if (!email) returnUserError('El email es requerido')
  if (!password) returnUserError('La contraseña es requerida')
}

export const ValidateUserUpdate = (user: UserEntity): void => {
  if (!user.firstName || !user.lastName) returnUserError('El nombre es requerido')
  if (!user.email) returnUserError('El email es requerido')
  if (!user.role) returnUserError('El rol es requerido')
  if (!user.country) returnUserError('El país es requerido')
}

export const ValidateId = (_id: string): void => {
  if (_id === 'id super admin') returnUserError('Acción inválida, no se puede cambiar el rol del Administrador')
}

//* POST ERRORS

export const ValidatePostCreate = (post: PostEntity): void => {
  if (!post.title) returnPostError('El título es requerido')
  if (!post.description) returnPostError('La descripción es requerida')
  if (!post.type) returnPostError('El tipo de posteo es requerido')
}

export const ValidateJdCreate = (jd: JdEntity): void => {
  if (!jd.requirements) returnPostError('Requirements for JD creation are needed')
  if (!jd.niceToHave) returnPostError('Nice to have for JD creation are needed')
  if (!jd.benefits) returnPostError('Benefits for JD creation are needed')
  if (!jd.stack) returnPostError('Tech Stack JD creation are needed')
}

export const ValidateReviewCreate = (review: ReviewEntity): void => {
  if (!review.name) returnPostError('El nombre de la empresa o usuario es requerido')
  if (!review.rol) returnPostError('El rol es requerido')
  if (!review.country) returnPostError('El país es requerido')
  if (!review.detail)returnPostError('La reseña es requerida')
}

export const ValidatePostUpdate = (post: PostEntity): void => {
  if (!post.title) returnPostError('El título es requerido')
  if (!post.description) returnPostError('La descripción es requerida')
  if (!post.type) returnPostError('El tipo de posteo es requerido')
}

export const ValidateJdUpdate = (jd: JdEntity): void => {
  if (!jd.title) returnPostError('El título es requerido')
  if (!jd.description) returnPostError('La descripción es requerida')
  if (!jd.company)returnPostError('El nombre de la empresa es requerido')
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
