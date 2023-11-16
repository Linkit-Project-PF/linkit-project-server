import { type AdminEntity } from '../../domain/admin/admin.entity'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../authentication/firebase'
import Admin from '../collections/Admin'

export const createAdmin = async (admin: AdminEntity, type: string): Promise<AdminEntity | string> => {
  try {
    if (type === 'email' && admin.password) {
      await createUserWithEmailAndPassword(
        auth,
        admin.email,
        admin.password
      )
    }
    const adminCreated = await Admin.create(admin)
    return adminCreated as AdminEntity
  } catch (error) {
    throw new Error(`Error de registro: ${(error as Error).message}`)
  }
}
