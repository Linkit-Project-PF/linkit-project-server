import { type PostEntity } from '../posts/domain/post/post.entity'
import { type JdEntity } from '../posts/domain/jd/jd.entity'
import { type ReviewEntity } from '../posts/domain/review/review.entity'
import Admin from '../users/infrastructure/schema/Admin'
import User from '../users/infrastructure/schema/User'
import Company from '../users/infrastructure/schema/Company'
import Review from '../posts/infrastructure/schema/Review'
import Jd from '../posts/infrastructure/schema/Jd'
import { ServerError, UncatchedError } from './errors'
import { objectIDValidator } from '../users/infrastructure/helpers/validateObjectID'
import { type UserEntity } from '../users/domain/user/user.entity'
import Post from '../posts/infrastructure/schema/Post'
import { type permissions, type AdminEntity } from '../users/domain/admin/admin.entity'
import { type CompanyEntity } from '../users/domain/company/company.entity'

//* GENERAL USER / AUTH VALIDATORS

const validateIfEmailExists = async (email: string): Promise<void> => {
  const result1 = await User.find({ email })
  const result2 = await Admin.find({ email })
  const result3 = await Company.find({ email })
  const result = [...result1, ...result2, ...result3]
  if (result.length) throw new ServerError('This email is already registered', 'El email ya esta registrado', 409)
}

const validateUserCreation = (user: UserEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!user.firstName) { error.en.push('first name'); error.es.push('nombre') }
  if (!user.lastName) { error.en.push('last name'); error.es.push('apellido') }
  if (!user.email) { error.en.push('email'); error.es.push('correo electronico') }
  if (error.en.length) throw new ServerError(`Missing properties to create an user: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear un usuario: ${error.es.join(', ')}`, 406)
}

export async function validateUser (user: UserEntity): Promise<void> {
  validateUserCreation(user)
  await validateIfEmailExists(user.email)
}

//* COMPANY VALIDATIONS

const companyValidator = (company: CompanyEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!company.companyName) { error.en.push('Company name'); error.es.push('Nombre de la empresa') }
  if (!company.email) { error.en.push('email'); error.es.push('correo electronico') }
  if (error.en.length) throw new ServerError(`Missing properties to create a company: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una empresa: ${error.es.join(', ')}`, 406)
}

export async function validateCompanyCreation (company: CompanyEntity): Promise<void> {
  companyValidator(company)
  await validateIfEmailExists(company.email)
}

//* ADMIN VALIDATIONS

const adminCreateValidator = (admin: AdminEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!admin.firstName) { error.en.push('first name'); error.es.push('nombre') }
  if (!admin.lastName) { error.en.push('last name'); error.es.push('apellido') }
  if (!admin.email) { error.en.push('email'); error.es.push('correo electronico') }
  if (error.en.length) throw new ServerError(`Missing properties to create an admin: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear un administrador: ${error.es.join(', ')}`, 406)
}

export async function validateAdmin (admin: AdminEntity): Promise<void> {
  adminCreateValidator(admin)
  await validateIfEmailExists(admin.email)
}

//* REVIEW VALIDATOR

const ValidateReviewCreate = (review: ReviewEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!review.name) { error.en.push('name'); error.es.push('nombre') }
  if (!review.role) { error.en.push('role'); error.es.push('rol') }
  if (!review.detail) { error.en.push('detail'); error.es.push('detalle') }
  if (!review.createdBy) { error.en.push('createdBy'); error.es.push('creado por') }
  if (error.en.length) throw new ServerError(`Missing properties to create a review: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una valoracion: ${error.es.join(', ')}`, 406)
}

const ValidateReviewIfAlreadyonDB = async (name: string): Promise<void> => {
  const allReviews = await Review.find({}, 'name')
  allReviews.forEach(obj => {
    if (obj.name === name) throw new ServerError('Company/user already has a review created', 'El usuario o empresa ya tiene una valoracion creada', 409)
  })
}

export async function validateReview (review: ReviewEntity): Promise<void> {
  ValidateReviewCreate(review)
  await ValidateReviewIfAlreadyonDB(review.name)
}

//* POST VALIDATOR

const ValidatePostCreate = (post: PostEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!post.title) { error.en.push('title'); error.es.push('titulo') }
  if (!post.description) { error.en.push('description'); error.es.push('descripcion') }
  if (!post.type) { error.en.push('type'); error.es.push('tipo') }
  if (!post.category) { error.en.push('category'); error.es.push('categoria') }
  if (!post.createdBy) { error.en.push('createdBy'); error.es.push('creado por') }
  if (error.en.length) throw new ServerError(`Missing properties to create a post: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una publicacion: ${error.es.join(', ')}`, 406)
}

async function validateIfPostExists (post: PostEntity): Promise<void> {
  let postExists = false
  const allPosts = await Post.find({}, 'title type')
  allPosts.forEach(pub => {
    if (pub.title === post.title && pub.type === post.type) postExists = true
  })
  if (postExists) throw new ServerError('Post title already exists', 'El titulo de esta publicacion ya existe', 409)
}

export async function validatePost (post: PostEntity): Promise<void> {
  ValidatePostCreate(post)
  await validateIfPostExists(post)
}
//* JD VALIDATORS

const validateIfJdCodeExists = async (code: string): Promise<void> => {
  const allJds = await Jd.find({}, 'code')
  allJds.forEach(jd => {
    if (jd.code === code) throw new ServerError('JD code is in use', 'El codigo para esa vacante ya existe', 409)
  })
}

const ValidateJdCreate = (jd: JdEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!jd.requirements) { error.en.push('requirements'); error.es.push('requisitos') }
  if (!jd.company) { error.en.push('company'); error.es.push('empresa') }
  if (!jd.niceToHave) { error.en.push('niceToHave'); error.es.push('requisitos valorados') }
  if (!jd.benefits) { error.en.push('benefits'); error.es.push('beneficios') }
  if (!jd.stack) { error.en.push('stack'); error.es.push('tecnologias') }
  if (!jd.code) { error.en.push('code'); error.es.push('codigo de vacante') }
  if (!jd.title) { error.en.push('title'); error.es.push('titulo') }
  if (!jd.description) { error.en.push('description'); error.es.push('descripcion') }
  if (!jd.type) { error.en.push('type'); error.es.push('tipo') }
  if (!jd.location) { error.en.push('location'); error.es.push('ubicacion') }
  if (!jd.modality) { error.en.push('modality'); error.es.push('modalidad') }
  if (error.en.length) throw new ServerError(`Missing properties to create a JD: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una vacante: ${error.es.join(', ')}`, 406)
}

async function validateCompany (title: string): Promise<void> {
  if (!title) throw new ServerError('Company name is needed to create a JD', 'El nombre de la empresa asociada es necesario para crear una vacante', 406)
  let exists = false
  const companies = await Company.find({}, 'companyName')
  companies.forEach(comp => { if (comp.companyName === title) exists = true })
  if (!exists) throw new ServerError('Company not found', 'No se encontro una empresa con ese ID en el registro', 404)
}

export async function validateJD (jobDescription: JdEntity): Promise<void> {
  try {
    ValidateJdCreate(jobDescription)
    await validateIfJdCodeExists(jobDescription.code)
    await validateCompany(jobDescription.company)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'creating JD', 'crear vacante')
  }
}

//* PERMISSIONS VALIDATOR

export async function permValidator (id: string, method: string, entity: string): Promise<void> {
  try {
    objectIDValidator(id, 'active admin', 'administrador activo')
    const admin = await Admin.findById(id)
    if (!admin) throw new ServerError('No admin found under that ID', 'No se encontro administrador bajo ese ID', 404)
    const validMethods = ['get', 'create', 'update', 'delete', 'special']
    if (!validMethods.includes(method)) throw new ServerError('Invalid permission', 'Permiso invalido', 406)
    const validEntities = ['users', 'admins', 'companies', 'posts', 'jds', 'reviews', 'permissions']
    if (!validEntities.includes(entity)) throw new ServerError('Invalid value for permission', 'Valor invalido para permiso', 406)
    if (!(admin.permissions as permissions)[method as keyof permissions].includes(entity)) throw new ServerError('You do not have the permission for this action', 'No tienes los permisos para hacer esta accion', 401)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'validating permissions', 'validar permisos')
  }
}

//* POSTULATIONS VALIDATOR

export function validatePostulation (postulation: any): void {

}
