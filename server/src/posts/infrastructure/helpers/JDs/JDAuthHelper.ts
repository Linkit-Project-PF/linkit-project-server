import Admin from '../../../../users/infrastructure/collections/Admin'
import { objectIDValidator } from '../../../../users/infrastructure/helpers/validateObjectID'
import Jd from '../../collections/Jd'
import { type JdEntity } from '../../../domain/jd/jd.entity'

interface authResponse {
  value: string | JdEntity[]
  code: number
}

export default async function jdAuth (id: string, method: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id, 'logged admin')
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
    throw Error('Auth Error: ' + error.message)
  }
}
