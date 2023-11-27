import 'dotenv/config'
import { type UserEntity } from '../../../domain/user/user.entity'
import Admin from '../../schema/Admin'
import User from '../../schema/User'
import { objectIDValidator } from '../validateObjectID'

interface authResponse {
  value: string | UserEntity
  code: number
}

export default async function userAuth (id: string, method: string, editID?: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id, 'logged user')
    if (editID) objectIDValidator(editID, 'target user')
    const adminUser = await Admin.findById(id)
    if (!adminUser) {
      if (method === 'find') {
        const validUser = await User.findById(id)
        if (validUser) {
          response.value = validUser as UserEntity
          response.code = 200
        } else {
          response.value = 'Unauthorized'
          response.code = 401
        }
      } else {
        response.value = 'Unauthorized'
        response.code = 401
      }
    } else {
      if (!adminUser.active) {
        response.value = 'Admin is not active'
        response.code = 401
        return response
      }
      if (method === 'create') {
        if (adminUser.id !== process.env.SUPERADM_ID) {
          response.value = 'Unauthorized, only SUPERADM can do this operation'
          response.code = 401
        }
      } else if (method === 'delete' || method === 'edit') {
        const allUsers = await User.find({}, { projection: { _id: 1 } })
        let isUser = false
        allUsers.forEach(user => {
          if (String(user._id) === editID) isUser = true
        })
        if (!isUser) {
          response.value = 'Not a valid id for user. If you are trying to edit/delete another role , use the correct endpoint'
          response.code = 401
        }
      }
    }
    return response
  } catch (error: any) {
    throw Error('Auth Error: ' + error)
  }
}
