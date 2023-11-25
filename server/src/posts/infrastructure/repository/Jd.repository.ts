import { type JdEntity } from '../../domain/jd/jd.entity'
import { type JdRepository } from '../../domain/jd/jd.repository'
import Jd from '../schema/Jd'
import base from '../../../db/airtable'
import { ValidateJdCreate } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import CombinedFilters from '../../../users/infrastructure/helpers/CombinedFilters'

export class MongoJdRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity | string> {
    try {
      ValidateJdCreate(jd)
      const jdCreated = await Jd.create(jd)
      const mongoID = String(jdCreated._id)
      const airtableJd = await base('JD').create({
        Title: jd.title,
        Description: jd.description,
        Type: jd.type,
        Location: jd.location,
        Modality: jd.modality,
        Stack: jd.stack.join(', '),
        AboutUs: jd.aboutUs,
        AboutClient: jd.aboutClient ?? '',
        Responsabilities: jd.responsabilities,
        Requirements: jd.requirements.join(', '),
        NiceToHave: jd.niceToHave.join(', '),
        Benefits: jd.benefits.join(', '),
        Company: jd.company,
        Status: jd.status,
        WebID: mongoID,
        Code: jd.code
      })
      const JdCreated = await Jd.findByIdAndUpdate(mongoID, { airTableId: airtableJd.getId() }, { new: true })
      return JdCreated as JdEntity
    } catch (error) {
      throw new ValidationError(`Error al crear el jd: ${(error as Error).message}`)
    }
  }

  async findJD (value: string | string[], filter: string | string[], combined?: boolean): Promise<JdEntity | JdEntity[] | any> {
    try {
      let result
      const validSingleParams = ['title', 'location', 'type', 'modality', 'archived', 'company', 'airTableId', 'code', 'status']
      const validIncludeFilters = ['stack', 'users']
      if (!combined) {
        if (filter === 'all') result = await Jd.find()
        else if (filter === 'id') result = await Jd.findById(value)
        else if (validIncludeFilters.includes(filter as string)) {
          result = (await Jd.find()).filter(jd => (jd as any)[filter as string].includes(value))
        } else if (validSingleParams.includes(filter as string)) result = await Jd.find({ [filter as string]: value })
        else throw Error('Not a valid parameter')
      } else {
        result = CombinedFilters(filter as string[], value as string[], validSingleParams, validIncludeFilters, 'jd')
      }
      return result as unknown as JdEntity
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
