import { type JdEntity } from '../../domain/jd/jd.entity'
import { type JdRepository } from '../../domain/jd/jd.repository'
import Jd from '../schema/Jd'
import base from '../../../db/airtable'
import { ValidateJdCreate } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'

export class MongoJdRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity | string> {
    try {
      ValidateJdCreate(jd)
      const jdCreated = await Jd.create(jd)
      const mongoID = String(jdCreated._id)
      const airtableJd = base('JDs').create({
        Code: jd.code,
        Title: jd.title,
        Description: jd.description,
        Type: jd.type,
        Location: jd.location,
        Modality: jd.modality,
        Stack: jd.stack,
        AboutUs: jd.aboutUs,
        AboutClient: jd.aboutClient,
        Responsabilities: jd.responsabilities,
        Requirements: jd.requirements,
        NiceToHave: jd.niceToHave,
        Benefits: jd.benefits,
        Archived: jd.archived,
        Company: jd.company,
        Status: jd.status,
        Users: jd.users,
        CreatedDate: jd.createdDate
      })
      const jdCreatedWithAirtableId = await Jd.findByIdAndUpdate(mongoID, { airTableId: airtableJd.getId() }, { new: true })
      // TODO Create company on airtable here, follow user/company create logic.
      return jdCreatedWithAirtableId as JdEntity
    } catch (error) {
      throw new ValidationError(`Error al crear el jd: ${(error as Error).message}`)
    }
  }

  async findJD (value: string, filter: string): Promise<JdEntity | JdEntity[] | any> {
    try {
      let result
      const singleValidValues = ['title', 'location', 'type', 'modality', 'archived', 'company']
      if (filter === 'all') result = await Jd.find()
      else if (filter === 'id') result = await Jd.findById(value)
      else if (filter === 'stack') result = (await Jd.find()).filter(jd => jd.stack.includes(value))
      else if (singleValidValues.includes(filter)) result = await Jd.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result
    } catch (error) {
      return 'No fue posible encontrar la vacante'
    }
  }

  async editJD (_id: string, jd: JdEntity): Promise<JdEntity | any> {
    try {
      const editedJd = await Jd.findByIdAndUpdate(_id, jd, { new: true })
      return editedJd as JdEntity
    } catch (error) {
      throw new ValidationError(`Error al crear el jd: ${(error as Error).message}`)
    }
  }

  async deleteJD (_id: string): Promise<JdEntity[] | string> {
    try {
      await Jd.findByIdAndUpdate(_id, { $set: { archived: true } }, { new: true })
      const allJds = await Jd.find()
      return allJds
    } catch (error) {
      return 'Error al intentar archivar el jd'
    }
  }
}
