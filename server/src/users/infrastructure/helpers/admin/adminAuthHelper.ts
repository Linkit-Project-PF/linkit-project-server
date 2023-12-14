import { type AdminEntity } from '../../../domain/admin/admin.entity'
import Admin from '../../schema/Admin'
import { objectIDValidator } from '../validateObjectID'

interface authResponse {
  value: string | AdminEntity
  code: number
}

export default async function adminAuth (id: string, method: string, editID?: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id, 'logged admin', 'administrador activo')
    if (editID) objectIDValidator(editID, 'target admin', 'administrador a editar')
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
      if (method === 'create' || method === 'delete') {
        if (!isSuper) {
          response.value = 'Unauthorized, only SUPERADM can do this operation'
          response.code = 401
        }
      } else if (method === 'edit') {
        if (!isSuper && (editID !== id)) {
          response.value = 'Unauthorized, you can only edit your own information'
          response.code = 401
        }
      }
    }
    return response
  } catch (error: any) {
    throw Error('Auth Error: ' + error)
  }
}
