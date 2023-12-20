import base from '../../db/airtable'
import { type UserEntity } from '../domain/user/user.entity'
import { type CompanyEntity } from '../domain/company/company.entity'
import { type AdminEntity } from '../domain/admin/admin.entity'
import { type CustomType } from '../authentication/Infrastructure/authMongo.repository'
export const validateUserExists = async (user: CustomType): Promise<UserEntity | CompanyEntity | AdminEntity | string> => {
  try {
    const airtable = await base('UsersInfo').select({ view: 'Grid view' }).all()
    const fields = airtable.map(result => result.fields)
    const filterField = fields.filter(field => field.Email === user.email)
    if (filterField.length) throw new Error('Existe usuario')
    else return user as unknown as CustomType
    // else return 'Existe un usuario'
  } catch (error: any) {
    console.log(error)
    return 'no data'
  }
}
