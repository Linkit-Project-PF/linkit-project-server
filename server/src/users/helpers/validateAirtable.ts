import base from '../../db/airtable'
import { type CustomType } from '../authentication/Infrastructure/authMongo.repository'
import { ServerError, UncatchedError } from '../../errors/errors'
export const validateUserExists = async (user: CustomType): Promise<void> => {
  try {
    const airtable = await base('UsersInfo').select({ view: 'Grid view' }).all()
    const fields = airtable.map(result => result.fields)
    fields.forEach(record => { if (record.email === user.email) throw new ServerError('This email is already registered', 'El email ya esta registrado', 409) })
  } catch (error: any) {
    throw new UncatchedError(error.message, 'validating existence on airtable', 'validar existencia de usuario en airtable')
  }
}
