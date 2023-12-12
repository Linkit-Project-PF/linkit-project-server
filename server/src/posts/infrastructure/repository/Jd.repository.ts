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
      jd.stack = jd.stack.map(stack => stack.toLowerCase())
      const jdCreated = await Jd.create(jd)
      return jdCreated as JdEntity
    } catch (error) {
      throw new ValidationError(`Error creating jd: ${(error as Error).message}`)
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
          objectIDValidator(value as string, 'Jd to find')
          result = await Jd.findById(value)
        } else if (validIncludeFilters.includes(filter as string)) {
          if (filter === 'users') {
            result = await Jd.find({})
            result = result.filter((jd: JdEntity) => {
              let exists = false
              jd.users.forEach(user => {
                if (user.user.toString() === value) exists = true
              })
              console.log(exists)
              return exists
            })
          } else {
            const values = (value as string).split(', ').map(value => value.trim().toLowerCase())
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
        } else throw Error('Not a valid parameter')
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
      const jd = await Jd.findById(jdID)
      if (!jd) throw Error('Job Description does not exist')
      const user = await User.findById(userid, '_id')
      if (!user) throw Error('User does not exist')
      if (operation === 'create') {
        jd.users.forEach(obj => { if (obj.user === userid) throw Error('User already related to this JD') })
        const objectToAdd = { user: user._id, status }
        jd.users.push(objectToAdd)
      } else if (operation === 'status') {
        let existing = false
        let index
        jd.users.forEach((obj, idx) => { if (String(obj.user) === userid) { existing = true; index = idx } })
        if (!existing || typeof index === 'undefined') throw Error('User is not related to this JD')
        if (status === jd.users[index].status) throw Error('Status is the same as the previous one')
        jd.users[index].status = status
      } else if (operation === 'delete') {
        let existing = false
        let index
        jd.users.forEach((obj, idx) => { if (String(obj.user) === userid) { existing = true; index = idx } })
        if (!existing || typeof index === 'undefined') throw Error('User is not related to this JD')
        jd.users.splice(index, 1)
      } else throw Error('Not a valid operation')
      const replacedJD = await Jd.findOneAndReplace({ _id: jdID }, jd, { new: true })
      return replacedJD as JdEntity
    } catch (error) {
      throw Error(`Error relating user to jd: ${(error as Error).message}`)
    }
  }
}
