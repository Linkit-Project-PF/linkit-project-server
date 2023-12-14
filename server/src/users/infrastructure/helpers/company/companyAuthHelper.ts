import { type CompanyEntity } from '../../../domain/company/company.entity'
import Admin from '../../schema/Admin'
import Company from '../../schema/Company'
import { objectIDValidator } from '../validateObjectID'

interface authResponse {
  value: string | CompanyEntity
  code: number
}

export default async function companyAuth (id: string, method: string, editID?: string): Promise<authResponse> {
  try {
    const response: authResponse = { value: '', code: 0 }
    objectIDValidator(id, 'logged company', 'empresa activa')
    if (editID) objectIDValidator(editID, 'target company', 'empresa a editar')
    const adminUser = await Admin.findById(id)
    if (!adminUser) {
      if (method === 'find') {
        const validCompany = await Company.findById(id)
        if (validCompany) {
          response.value = validCompany as CompanyEntity
          response.code = 200
        } else {
          response.value = 'Unauthorized'
          response.code = 401
        }
      } else {
        response.value = 'Unauthorized for this method'
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
        const allCompanies = await Company.find({}, { projection: { _id: 1 } })
        let isCompany = false
        allCompanies.forEach(company => {
          if (String(company._id) === editID) isCompany = true
        })
        if (!isCompany) {
          response.value = 'Not a valid id for a company. If you are trying to edit/delete another role , use the correct endpoint'
          response.code = 401
        }
      }
    }
    return response
  } catch (error: any) {
    throw Error('Auth Error: ' + error)
  }
}
