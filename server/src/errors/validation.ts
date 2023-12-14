import { type PostEntity } from '../posts/domain/post/post.entity'
import { type JdEntity } from '../posts/domain/jd/jd.entity'
import { type ReviewEntity } from '../posts/domain/review/review.entity'
import Admin from '../users/infrastructure/schema/Admin'
import User from '../users/infrastructure/schema/User'
import Company from '../users/infrastructure/schema/Company'
import Review from '../posts/infrastructure/schema/Review'
import { returnUserError, returnConectError } from './returnErrors'
import Jd from '../posts/infrastructure/schema/Jd'
import { ServerError } from './errors'
import { type CustomType } from '../users/authentication/Infrastructure/authMongo.repository'

//* USER ERRORS
export const validateIfEmailExists = async (email: string): Promise<void> => {
  const result1 = await User.find({ email })
  const result2 = await Admin.find({ email })
  const result3 = await Company.find({ email })
  const result = [...result1, ...result2, ...result3]
  if (result.length) throw new ServerError('This email is already registered', 'El email ya esta registrado', 409)
}

export const ValidateReviewIfAlreadyonDB = async (name: string): Promise<void> => {
  const allReviews = await Review.find({}, 'name')
  allReviews.forEach(obj => {
    if (obj.name === name) throw new ServerError('Company/user already has a review created', 'El usuario o empresa ya tiene una valoracion creada', 409)
  })
}

export const validateIfJdCodeExists = async (code: string): Promise<void> => {
  const allJds = await Jd.find({}, 'code')
  allJds.forEach(jd => {
    if (jd.code === code) throw new ServerError('JD code is in use', 'El codigo para esa vacante ya existe', 409)
  })
}

export const ValidateUserRegister = (entity: CustomType): void => {
  if (entity.role === 'admin' || entity.role === 'user') {
    // @ts-expect-error: Unique properties not being matched by TypeScript
    if (!entity.firstName || !entity.lastName || !entity.email) throw new ServerError('Full name (first/last) and email are required to register', 'El nombre completo y el email son necesarios para el registro', 406)
  } else {
    // @ts-expect-error: Unique properties not being matched by TypeScript
    if (!entity.companyName || !entity.email) throw new ServerError('Company name is required to register', 'El nombre de la empresa es requerido para elregistro', 406)
  }
}

export const ValidateUserLogin = (email: string, password: string): void => {
  if (email === 'undefined' || password === 'undefined') returnUserError('Credenciales requeridas')
  if (!email) returnUserError('El email es requerido')
  if (!password) returnUserError('La contraseña es requerida')
}

//* POST ERRORS

export const ValidatePostCreate = (post: PostEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!post.title) error.en.push('title'); error.es.push('titulo')
  if (!post.description) error.en.push('description'); error.es.push('descripcion')
  if (!post.type) error.en.push('type'); error.es.push('tipo')
  if (!post.category) error.en.push('category'); error.es.push('categoria')
  if (error.en.length) throw new ServerError(`Missing properties to create a post: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una publicacion: ${error.es.join(', ')}`, 406)
}

export const ValidateJdCreate = (jd: JdEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!jd.requirements) error.en.push('requirements'); error.es.push('requisitos')
  if (!jd.niceToHave) error.en.push('niceToHave'); error.es.push('requisitos valorados')
  if (!jd.benefits) error.en.push('benefits'); error.es.push('beneficios')
  if (!jd.stack) error.en.push('stack'); error.es.push('tecnologias')
  if (!jd.code) error.en.push('code'); error.es.push('codigo de vacante')
  if (!jd.title) error.en.push('title'); error.es.push('titulo')
  if (!jd.description) error.en.push('description'); error.es.push('descripcion')
  if (!jd.type) error.en.push('type'); error.es.push('tipo')
  if (!jd.location) error.en.push('location'); error.es.push('ubicacion')
  if (!jd.modality) error.en.push('modality'); error.es.push('modalidad')
  if (!jd.status) error.en.push('status'); error.es.push('estado')
  if (error.en.length) throw new ServerError(`Missing properties to create a JD: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una vacante: ${error.es.join(', ')}`, 406)
}

export const ValidateReviewCreate = (review: ReviewEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!review.name) error.en.push('name'); error.es.push('nombre')
  if (!review.role) error.en.push('role'); error.es.push('rol')
  if (!review.detail) error.en.push('detail'); error.es.push('detalle')
  if (error.en.length) throw new ServerError(`Missing properties to create a review: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una valoracion: ${error.es.join(', ')}`, 406)
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
