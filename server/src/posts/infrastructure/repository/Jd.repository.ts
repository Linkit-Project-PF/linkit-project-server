import { type JdEntity } from '../../domain/jd/jd.entity'
import { type JdRepository } from '../../domain/jd/jd.repository'
import Jd from '../schema/Jd'
import { ValidateJdCreate, validateIfJdCodeExists } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import CombinedFilters from '../../../users/infrastructure/helpers/CombinedFilters'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'
import validateCompany from '../helpers/JDs/validateCompany'
import User from '../../../users/infrastructure/schema/User'

export class MongoJdRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity> {
    try {
      await validateCompany(jd.company)
      await validateIfJdCodeExists(jd.code)
      ValidateJdCreate(jd)
      const jdCreated = await Jd.create(jd)
      return jdCreated as JdEntity
    } catch (error) {
      throw new ValidationError(`Error creating jd: ${(error as Error).message}`)
    }
  }

  async findJD (value: string | string[], filter: string | string[], combined?: boolean): Promise<JdEntity | JdEntity[]> {
    try {
      let result
      const validSingleParams = ['title', 'location', 'type', 'modality', 'archived', 'company', 'airTableId', 'code', 'status']
      const validIncludeFilters = ['stack', 'users']
      if (!combined) {
        if (filter === 'all') result = await Jd.find()
        else if (filter === 'id') {
          objectIDValidator(value as string, 'Jd to find')
          result = await Jd.findById(value)
        } else if (validIncludeFilters.includes(filter as string)) {
          result = (await Jd.find()).filter(jd => (jd as any)[filter as string].includes(value))
        } else if (validSingleParams.includes(filter as string)) result = await Jd.find({ [filter as string]: value })
        else throw Error('Not a valid parameter')
      } else {
        result = CombinedFilters(filter as string[], value as string[], validSingleParams, validIncludeFilters, 'jd')
      }
      return result as JdEntity[]
    } catch (error) {
      throw new ValidationError(`Error searching jd: ${(error as Error).message}`)
    }
  }

  async editJD (_id: string, jd: any): Promise<JdEntity> {
    try {
      objectIDValidator(_id, 'jd to edit')
      const invalidEdit = ['_id', 'users', 'createdDate']
      Object.keys(jd).forEach(key => { if (invalidEdit.includes(key)) throw Error('ID/users/date cannot be changed through this route') })
      const editedJd = await Jd.findByIdAndUpdate(_id, jd, { new: true })
      if (editedJd) return editedJd as JdEntity
      else throw Error('JobDescription not found')
    } catch (error) {
      throw new ValidationError(`Error creating jd: ${(error as Error).message}`)
    }
  }

  async deleteJD (_id: string): Promise<JdEntity[]> {
    try {
      await Jd.findByIdAndUpdate(_id, { archived: true }, { new: true })
      //* This is set like this for Front-End requirements.
      const allJds = await Jd.find()
      return allJds as JdEntity[]
    } catch (error) {
      throw Error('Error deleting jd: ' + (error as Error).message)
    }
  }

  async relateUser (jdID: string, userid: string, status: string, operation: string): Promise<JdEntity> {
    try {
      if (!status || !operation || !jdID || !userid) throw Error('Missing parameters: operation, jd, user and status needed')
      objectIDValidator(jdID, 'jd in relation')
      objectIDValidator(userid, 'user to relate')
      if (operation === 'create') {
        const jd = await Jd.findById(jdID)
        if (!jd) throw Error('Job Description does not exist')
        const user = await User.findById(userid, '_id')
        if (!user) throw Error('User does not exist')
        const objectToAdd = { user: user._id, status }
        jd.users.push(objectToAdd)
        const replacedJD = await Jd.findOneAndReplace({ _id: jdID }, jd, { new: true })
        return replacedJD as JdEntity
      } else throw Error('Not a valid operation')
    } catch (error) {
      throw Error(`Error relating user to jd: ${(error as Error).message}`)
    }
  }
}
