import { type JdEntity } from '../../domain/jd/jd.entity'
import { type JdRepository } from '../../domain/jd/jd.repository'
import Jd from '../schema/Jd'
import { ValidateJdCreate, validateIfJdCodeExists } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import CombinedFilters from '../../../users/infrastructure/helpers/CombinedFilters'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'
import validateCompany from '../helpers/JDs/validateCompany'
import User from '../../../users/infrastructure/schema/User'

export class MongoJdRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity> {
    try {
      // TODO Refactor this code so only a single validation function does the title, existing code and prop validation
      await validateCompany(jd.company)
      await validateIfJdCodeExists(jd.code)
      ValidateJdCreate(jd)
      jd.stack = jd.stack.map(stack => stack.toLowerCase())
      const jdCreated = await Jd.create(jd)
      return jdCreated as JdEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating JD', 'crear vacante')
    }
  }

  async findJD (value: string | string[], filter: string | string[], combined?: boolean): Promise<JdEntity | JdEntity[]> {
    try {
      let result
      const validSingleParams = ['title', 'location', 'type', 'modality', 'archived', 'company', 'code', 'status']
      const validIncludeFilters = ['stack', 'users']
      if (!combined) {
        if (filter === 'all') result = await Jd.find()
        else if (filter === 'id') {
          objectIDValidator(value as string, 'Jd to find', 'vacante buscada')
          result = await Jd.findById(value)
        } else if (validIncludeFilters.includes(filter as string)) {
          if (filter === 'users') {
            result = await Jd.find({})
            result = result.filter((jd: JdEntity) => {
              let exists = false
              jd.users.forEach(user => {
                if (user.user.toString() === value) exists = true
              })
              return exists
            })
          } else {
            const values = (value as string).split(',').map(value => value.trim().toLowerCase())
            if (values.length > 1) {
              result = await Jd.find()
              for (let i = 0; i < values.length; i++) {
                console.log(values[i])
                result = result.filter((jd: JdEntity) => (jd as any)[filter as string].includes(values[i]))
              }
            } else { result = (await Jd.find()).filter(jd => (jd as any)[filter as string].includes(value)) }
          }
        } else if (validSingleParams.includes(filter as string)) {
          result = await Jd.find({ [filter as string]: value })
        } else throw new ServerError('Not a valid parameter', 'No es un parametro de filtrado valido', 406)
      } else {
        result = CombinedFilters(filter as string[], value as string[], validSingleParams, validIncludeFilters, 'jd')
      }
      return result as JdEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching JD', 'buscar vacante')
    }
  }

  async editJD (_id: string, jd: any): Promise<JdEntity> {
    try {
      objectIDValidator(_id, 'jd to edit', 'vacante a editar')
      const invalidEdit = ['_id', 'users', 'createdDate']
      Object.keys(jd).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('ID/users/date are forbidden on this route', 'ID/usuarios y fecha no se permiten cambiar en esta ruta', 403) })
      const editedJd = await Jd.findByIdAndUpdate(_id, jd, { new: true })
      if (editedJd) return editedJd as JdEntity
      else throw new ServerError('JobDescription not found', 'Vacante no encontrada', 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing JD', 'editar vacante')
    }
  }

  async deleteJD (_id: string): Promise<JdEntity[]> {
    try {
      objectIDValidator(_id, 'jd to delete', 'vacante a eliminar')
      const result = await Jd.findByIdAndUpdate(_id, { archived: true })
      if (!result) throw new ServerError('JD does not exist under that ID', 'No existen vacantes con ese ID', 404)
      //* This is set like this as Front-End requirements.
      const allJds = await Jd.find()
      return allJds as JdEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting JD', 'eliminar vacante')
    }
  }

  async relateUser (jdID: string, userid: string, operation: string): Promise<JdEntity> {
    try {
      if (!status || !operation || !jdID || !userid) throw new ServerError('Missing parameters: operation, jd, user and status needed', 'Faltan datos: Operacion, vacante y usario son obligatorios', 406)
      objectIDValidator(jdID, 'jd in relation', 'vacante a relacionar')
      objectIDValidator(userid, 'user to relate', 'usuario a relacionar')
      const jd = await Jd.findById(jdID)
      if (!jd) throw new ServerError('Job Description does not exist', 'No existe la vacante a relacionar', 404)
      const user = await User.findById(userid, '_id')
      if (!user) throw new ServerError('User does not exist', 'No existe el usuario a relacionar', 404)
      if (operation === 'create') {
        jd.users.forEach(obj => { if (obj.user === userid) throw new ServerError('User already related to this JD', 'La vacante ya tiene a este usuario relacionado', 409) })
        const objectToAdd = { user: user._id, status }
        jd.users.push(objectToAdd)
      } else if (operation === 'edit') {
        let existing = false
        let index
        jd.users.forEach((obj, idx) => { if (String(obj.user) === userid) { existing = true; index = idx } })
        if (!existing || typeof index === 'undefined') throw new ServerError('User is not related to this JD', 'El usuario no esta relacionado con la vacante', 409)
        if (status === jd.users[index].status) throw new ServerError('Status is the same as the previous one', 'El estado a cambiar es el mismo que tenia antes', 409)
        jd.users[index].status = status
      } else if (operation === 'delete') {
        let existing = false
        let index
        jd.users.forEach((obj, idx) => { if (String(obj.user) === userid) { existing = true; index = idx } })
        if (!existing || typeof index === 'undefined') throw new ServerError('User is not related to this JD', 'El usuario no esta relacionado a esta vacante', 406)
        jd.users.splice(index, 1)
      } else throw new ServerError('Not a valid operation', 'Operacion no valida', 406)
      const replacedJD = await Jd.findOneAndReplace({ _id: jdID }, jd, { new: true })
      return replacedJD as JdEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'relating JD', 'relacionar vacante')
    }
  }
}
