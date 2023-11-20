import 'dotenv/config'
import { type UserEntity } from '../../../domain/user/user.entity'
import Admin from '../../collections/Admin'
import User from '../../collections/User'
import { objectIDValidator } from '../validateObjectID'

interface authResponse {
  value: string | UserEntity
  code: number
}

export default async function userAuth (id: string, method: string, editID?: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    if (!objectIDValidator(id)) {
      response.value = 'Not a valid ID'
      response.code = 401
      return response
    }
    const adminUser = await Admin.findById(id)
    if (adminUser && !adminUser?.active) {
      response.value = 'Admin is not active'
      response.code = 401
      return response
    }
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
      if (method === 'create') {
        if (adminUser.id !== process.env.SUPERADM_ID) {
          response.value = 'Unauthorized, only SUPERADM can do this operation'
          response.code = 401
        }
      } else if (method === 'delete' || method === 'edit') {
        if (!editID) {
          response.value = 'Validator needs objectID as param'
          response.code = 400
        } else {
          if (!objectIDValidator(editID)) {
            response.value = 'Not a valid edited ID'
            response.code = 401
            return response
          }
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
    }
    return response
  } catch (error: any) {
    // TODO Check if correct error handling here
    throw Error('Auth Error: ' + error)
  }
}
