import { type JdEntity } from '../../domain/jd/jd.entity'
import { type JdRepository } from '../../domain/jd/jd.repository'
import Jd from '../schema/Jd'
import { validateJD } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import CombinedFilters from '../../../users/infrastructure/helpers/CombinedFilters'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'
import { JDTranslate } from '../helpers/JDTranslator'

export class MongoJdRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity> {
    try {
      await validateJD(jd)
      jd.stack = jd.stack.map(stack => stack.toLowerCase())
      const jdCreated = await Jd.create(jd)
      return jdCreated as JdEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating JD', 'crear vacante')
    }
  }

  async findJD (value: string | string[], filter: string | string[], lang?: string, combined?: boolean): Promise<JdEntity | JdEntity[]> {
    try {
      let result
      const validSingleParams = ['title', 'location', 'type', 'modality', 'archived', 'company', 'status']
      if (!combined) {
        if (filter === 'all') result = await Jd.find()
        else if (filter === 'id') {
          objectIDValidator(value as string, 'Jd to find', 'vacante buscada')
          result = await Jd.findById(value)
          if (!result) throw new ServerError('No JD found under that ID', 'No se encontro una vacante con ese ID', 404)
        } else if (filter === 'stack') {
          const values = (value as string).split(',').map(value => value.trim().toLowerCase())
          result = await Jd.find({ stack: { $in: [values[0]] } })
          if (values.length > 1) {
            for (let i = 1; i < values.length; i++) {
              result = (result).filter((jd: JdEntity) => jd.stack.includes(values[i]))
            }
          }
        } else if (filter === 'code') {
          result = await Jd.find({ code: value })
          if (result.length < 1) throw new ServerError('No JD found under that CODE', 'No se encontro vacante bajo ese codigo', 404)
          if (lang === 'en') {
            await JDTranslate(result[0])
          }
        } else if (validSingleParams.includes(filter as string)) {
          result = await Jd.find({ [filter as string]: value })
        } else throw new ServerError('Not a valid parameter', 'No es un parametro de filtrado valido', 406)
      } else {
        result = CombinedFilters(filter as string[], value as string[], validSingleParams, ['stack'], 'jd')
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
      const invalidEdit = ['_id', 'createdDate']
      Object.keys(jd).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('ID/date cannot be edited', 'ID/fecha no pueden ser editados', 403) })
      const editedJd = await Jd.findByIdAndUpdate(_id, jd, { new: true })
      if (editedJd) return editedJd as JdEntity
      else throw new ServerError('Job Description not found', 'Vacante no encontrada', 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing JD', 'editar vacante')
    }
  }

  async deleteJD (_id: string, reqID?: string, total?: string): Promise<JdEntity[]> {
    try {
      objectIDValidator(_id, 'jd to delete', 'vacante a eliminar')
      const JD = await Jd.findById(_id)
      if (!JD) throw new ServerError('JD does not exist under that ID', 'No existen vacantes con ese ID', 404)
      if (!total || total === 'false') {
        await Jd.findByIdAndUpdate(_id, { archived: !JD.archived })
      } else if (total === 'true') {
        if (reqID !== process.env.SUPERADM_ID) throw new ServerError('Only superadm can delete totally', 'El borrado total solo lo puede hcaer el super admin', 401)
        await Jd.findByIdAndDelete(_id)
      }
      //* This is set like this as Front-End requirements.
      const allJds = await Jd.find()
      return allJds as JdEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting JD', 'eliminar vacante')
    }
  }
}
