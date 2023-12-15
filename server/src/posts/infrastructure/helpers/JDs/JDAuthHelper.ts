import Admin from '../../../../users/infrastructure/schema/Admin'
import { objectIDValidator } from '../../../../users/infrastructure/helpers/validateObjectID'
import Jd from '../../schema/Jd'
import { type JdEntity } from '../../../domain/jd/jd.entity'
import { ServerError, UncatchedError } from '../../../../errors/errors'
import { type Types } from 'mongoose'

interface authResponse {
  value: string | JdEntity[]
  code: number
}

export default async function jdAuth (id: Types.ObjectId, method: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id.toString(), 'logged admin', 'usuario activo')
    const adminUser = await Admin.findById(id)
    if (!adminUser || !adminUser?.active) {
      if (method === 'find') {
        const result = (await Jd.find()).filter(jd => jd.users.includes(id))
        response.value = result
        response.code = 200
      } else {
        response.value = 'Unauthorized, admin permissions required'
        response.code = 401
      }
    }
    return response
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'authenticating', 'autenticar')
  }
}
