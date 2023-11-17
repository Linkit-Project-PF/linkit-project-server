/* eslint-disable indent */
import { type JdEntity } from '../../domain/jd/jd.entity'
import { type JdRepository } from '../../domain/jd/jd.repository'
import Jd from '../collections/Jd'
import mongoDBConnect from '../../../db/mongo'
import { ValidateJdCreate, ValidateJdUpdate } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'

export class MongoJdRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity | any> {
    try {
      ValidateJdCreate(jd)
      const jdCreated = await Jd.create(jd)
      return jdCreated
    } catch (error) {
      throw new ValidationError(`Error al crear el jd: ${(error as Error).message}`)
    }
  }

  async findJD (value: string, filter: string): Promise<JdEntity | JdEntity[] | any> {
    try {
      let result
      const singleValidValues = ['title', 'location', 'modality', 'schedule', 'archived']
      if (filter === 'all') result = await Jd.find()
      else if (filter === 'id') result = await Jd.findById(value)
      else if (filter === 'stack') result = (await Jd.find()).filter(jd => jd.stack?.includes(value))
      else if (singleValidValues.includes(filter)) result = await Jd.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result
    } catch (error) {
      return 'No fue posible encontrar la vacante'
    }
  }

  async editJD (_id: string, jd: JdEntity): Promise<JdEntity | any> {
    try {
      ValidateJdUpdate(jd)
      const editedJd = await Jd.findByIdAndUpdate(_id, jd)
      return editedJd
    } catch (error) {
      throw new ValidationError(`Error al crear el jd: ${(error as Error).message}`)
    }
  }

  async deleteJD (id: string): Promise<string | any> {
    try {
      await mongoDBConnect()
      await Jd.updateOne(
        { id },
        { $set: { archived: true } }
      )
    } catch (error) {
      return 'Error al intentar archivar el jd'
    }
  }
}