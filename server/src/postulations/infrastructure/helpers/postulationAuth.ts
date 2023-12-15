import { ServerError, UncatchedError } from '../../../errors/errors'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'
import Admin from '../../../users/infrastructure/schema/Admin'
import { type PostulationEntity } from '../../domain/postulation.entity'

interface authResponse {
  value: string | PostulationEntity
  code: number
}

export default async function postulationAuth (id: string, editID?: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id, 'logged admin', 'administrador activo')
    if (editID) objectIDValidator(editID, 'target postulation', 'postulacion a editar')
    const adminUser = await Admin.findById(id)
    if (!adminUser) {
      response.value = 'Unauthorized, admin permissions required'
      response.code = 401
    } else {
      const isSuper = Boolean(String(adminUser._id) === process.env.SUPERADM_ID)
      if (!adminUser.active && !isSuper) {
        response.value = 'Admin is not active'
        response.code = 401
        return response
      }
    }
    return response
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'validating authorization', 'validar autorizacion')
  }
}
