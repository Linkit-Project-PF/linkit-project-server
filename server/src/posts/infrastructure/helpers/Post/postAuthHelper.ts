import Admin from '../../../../users/infrastructure/schema/Admin'
import { objectIDValidator } from '../../../../users/infrastructure/helpers/validateObjectID'
import { ServerError, UncatchedError } from '../../../../errors/errors'

interface authResponse {
  value: string
  code: number
}

export default async function postAuth (id: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id, 'logged admin', 'admin activo')
    const adminUser = await Admin.findById(id)
    if (!adminUser || !adminUser?.active) {
      response.value = 'Unauthorized, admin permissions required'
      response.code = 401
    }
    return response
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'authenticating', 'autenticar')
  }
}
