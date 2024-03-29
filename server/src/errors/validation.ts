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
import { type postulation } from '../interfaces'
import { readFile } from '../resources/infrastructure/helpers/JSONfiles'
import { type OKRsEntity } from '../posts/domain/OKRs/OKRs.entity'
import countriesList from '../resources/infrastructure/schema/countries.json'

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
  if (!user.provider) { error.en.push('provider'); error.es.push('proveedor de autenticacion') }
  if (error.en.length) throw new ServerError(`Missing properties to create an user: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear un usuario: ${error.es.join(', ')}`, 406)
}

export async function validateUser (user: UserEntity): Promise<void> {
  validateUserCreation(user)
  await validateIfEmailExists(user.email)
}

export function validateUserEdition (user: Partial<UserEntity>): void {
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/
  const countries = countriesList.entries.map(country => country.name)
  if (user.linkedin) {
    if (!linkedinRegex.test(user.linkedin)) throw new ServerError('Not a valid linkedin profile link', 'No es un enlace valido de perfil de linkedin', 406)
  }
  if (user.country) {
    if (!countries.includes(user.country)) throw new ServerError('Not a valid country', 'Pais invalido', 406)
  }
  if (user.cv) {
    if (!(typeof user.cv === 'object' && user.cv !== null && 'fileName' in user.cv &&
     'cloudinaryId' in user.cv)) throw new ServerError('Not a valid CV information', 'Informacion de CV invalida', 406)
  }
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

export function validateCompanyEdition (company: Partial<CompanyEntity>): void {
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/
  const countries = countriesList.entries.map(country => country.name)
  if (company.linkedin) {
    if (!linkedinRegex.test(company.linkedin)) throw new ServerError('Not a valid linkedin profile link', 'No es un enlace valido de perfil de linkedin', 406)
  }
  if (company.country) {
    if (!countries.includes(company.country)) throw new ServerError('Not a valid country', 'Pais invalido', 406)
  }
}

//* ADMIN VALIDATIONS

const adminCreateValidator = (admin: AdminEntity): void => {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!admin.firstName) { error.en.push('first name'); error.es.push('nombre') }
  if (!admin.lastName) { error.en.push('last name'); error.es.push('apellido') }
  if (!admin.email) { error.en.push('email'); error.es.push('correo electronico') }
  if (!admin.provider) { error.en.push('provider'); error.es.push('proveedor de autenticacion') }
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

export async function validateJD (jobDescription: JdEntity): Promise<void> {
  try {
    ValidateJdCreate(jobDescription)
    await validateIfJdCodeExists(jobDescription.code)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'creating JD', 'crear vacante')
  }
}

//* OKRs VALIDATORS

export async function ValidateOKRsCreate (OKR: OKRsEntity): Promise<void> {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!OKR.generalTitleOKR) { error.en.push('OKR general title'); error.es.push('Titulo general del OKR') }
  if (!OKR.areas) { error.en.push('OKR Area'); error.es.push('Área de OKR') }
  if (error.en.length) throw new ServerError(`Missing properties to create a OKR: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear un OKR: ${error.es.join(', ')}`, 406)
}

//* PERMISSIONS VALIDATOR

export async function permValidator (id: string, method: string, entity: string): Promise<void> {
  try {
    objectIDValidator(id, 'active admin', 'administrador activo')
    const admin = await Admin.findById(id)
    if (!admin) throw new ServerError('No admin found under that ID', 'No se encontro administrador bajo ese ID', 404)
    const validMethods = ['get', 'create', 'update', 'delete', 'special']
    if (!validMethods.includes(method)) throw new ServerError('Invalid permission', 'Permiso invalido', 406)
    const validEntities = ['users', 'admins', 'companies', 'posts', 'jds', 'reviews', 'permissions', 'OKRs']
    if (!validEntities.includes(entity)) throw new ServerError('Invalid value for permission', 'Valor invalido para permiso', 406)
    if (!(admin.permissions as permissions)[method as keyof permissions].includes(entity)) throw new ServerError('You do not have the permission for this action', 'No tienes los permisos para hacer esta accion', 401)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'validating permissions', 'validar permisos')
  }
}

//* POSTULATIONS VALIDATOR

export async function validatePostulation (postulation: postulation, userid: string): Promise<void> {
  if (!userid) throw new ServerError('No ID of applicant found', 'El ID del aplicante es necesario', 406)
  objectIDValidator(userid, 'user creating application', 'usuario aplicando')
  validateProps(postulation)
  await validatePostulationTypes(postulation)
  await validateCandidate(postulation, userid) //! Si no se han creado usuarios comentar este codigo para que deje crear testing data.
}

function validateProps (postulation: postulation): void {
  const error: { en: string[], es: string[] } = { en: [], es: [] }
  if (!postulation.code) { error.en.push('code'); error.es.push('codigo de jd') }
  if (!postulation.stack) { error.en.push('stack'); error.es.push('tecnologias') }
  if (!postulation.email) { error.en.push('email'); error.es.push('correo electronico') }
  if (!postulation.linkedin) { error.en.push('linkedin'); error.es.push('linkedin') }
  if (!postulation.salary) { error.en.push('salary expectation'); error.es.push('expectativa salarial') }
  if (!postulation.english) { error.en.push('english level'); error.es.push('nivel de ingles') }
  if (!postulation.reason) { error.en.push('reason'); error.es.push('razon para aplicar') }
  if (!postulation.availability) { error.en.push('availability'); error.es.push('disponibilidad') }
  if (!postulation.firstName) { error.en.push('firstName'); error.es.push('nombre del postulante') }
  if (!postulation.lastName) { error.en.push('lastName'); error.es.push('apellido del postulante') }
  if (!postulation.country) { error.en.push('country'); error.es.push('pais') }
  if (error.en.length) throw new ServerError(`Missing properties to create a postulation: ${error.en.join(', ')}`, `Faltan las siguientes propiedades para crear una postulacion: ${error.es.join(', ')}`, 406)
}

async function validatePostulationTypes (postulation: postulation): Promise<void> {
  const validCountries = JSON.parse((await readFile('./src/resources/infrastructure/schema/countries.json'))).entries.map((entry: any) => entry.name)
  const validEnglishLevel = ['intermediate (B2)', 'Intermediate', 'Advanced', 'Professional', 'intermediate (B1)', 'Basic'] //! Add here new english levels
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!validCountries.includes(postulation.country)) throw new ServerError('Invalid country', 'Pais invalido', 406)
  if (typeof postulation.salary !== 'number') throw new ServerError('Salary must be a number', 'El salario debe ser un numero', 406)
  if (!emailRegex.test(postulation.email)) throw new ServerError('Invalid email', 'Email invalido', 406)
  if (!postulation.linkedin.includes('www.linkedin.com/in')) throw new ServerError('Invalid linkedin', 'LinkedIn invalido', 406)
  if (!validEnglishLevel.includes(postulation.english)) throw new ServerError('Invalid english level', 'Nivel de ingles invalido', 406)
  if (!Array.isArray(postulation.stack)) throw new ServerError('Stack must be an array', 'Las tecnologias deben ser un Array', 406)
  postulation.stack.forEach(stack => { if (typeof stack !== 'string') throw new ServerError('Some stack info is not a string', 'Todas las tecnologias deben ser texto', 406) })
  if (typeof postulation.reason !== 'string' || typeof postulation.availability !== 'string') throw new ServerError('reason and/or availability are invalid', 'La razon de postulacion y/o la disponibilidad son invalidas', 406)
}

async function validateCandidate (postulation: postulation, userid: string): Promise<void> {
  const loggedUser = await User.findById(userid)
  if (!loggedUser) throw new ServerError('Unauthorized', 'No autorizado', 401)
  else loggedUser.postulations.forEach(code => { if (code === postulation.code) throw new ServerError('You have already a postulation for this job description', 'Ya tienes una postulación para esta vacante', 409) })
  const talent: UserEntity | null = await User.findOne({ firstName: postulation.firstName, lastName: postulation.lastName })
  if (!talent) throw new ServerError('No user under that full name', 'No se encuentra usuario con ese nombre y apellido', 404)
}

// RESOURCES JSON

export function validateJSONBody (body: { id: number, name: string }): void {
  const keys = Object.keys(body)
  if (!keys.includes('id') || !keys.includes('name')) throw new ServerError('ID and name are required for new entry', 'El ID y el nombre son obligatorios', 406)
  if (!body.id || !body.name) throw new ServerError('ID and name must be valid', 'El ID y nombre deben ser validos', 406)
  if (typeof body.id !== 'number') throw new ServerError('ID must be a number', 'El ID debe ser un numero', 406)
  if (keys.length > 2) throw new ServerError('Entries must have just 2 values', 'Solo se permiten dos valores para una nueva entrada', 406)
}
