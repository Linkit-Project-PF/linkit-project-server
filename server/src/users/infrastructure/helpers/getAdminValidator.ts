import { type AdminUseCase } from '../../aplication/adminUseCase'
import { type AdminEntity } from '../../domain/admin/admin.entity'

interface AdminQuery {
  id?: string
  name?: string
  email?: string
  active?: string
}

export default async function getAdminValidator (query: AdminQuery, adminUseCase: AdminUseCase): Promise<AdminEntity | AdminEntity[] | string> {
  try {
    let admin
    if (Object.keys(query).length) {
      const filter: string = Object.keys(query)[0]
      const value: string = Object.values(query)[0]
      admin = await adminUseCase.findAdmin(value, filter)
    } else {
      admin = await adminUseCase.findAdmin('', 'all')
    }
    return admin
  } catch (error: any) {
    throw Error(error)
  }
}
