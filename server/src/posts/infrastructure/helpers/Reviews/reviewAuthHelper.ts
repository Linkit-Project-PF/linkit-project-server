import Admin from '../../../../users/infrastructure/schema/Admin'
import { objectIDValidator } from '../../../../users/infrastructure/helpers/validateObjectID'

interface authResponse {
  value: string
  code: number
}

export default async function reviewAuth (id: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id, 'logged admin')
    const adminUser = await Admin.findById(id)
    if (!adminUser?.active) {
      response.value = 'Unauthorized, admin permissions required'
      response.code = 401
    }
    return response
  } catch (error: any) {
    throw Error('Auth Error: ' + error.message)
  }
}
