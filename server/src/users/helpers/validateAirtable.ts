import base from '../../db/airtable'
import { type CustomType } from '../authentication/Infrastructure/authMongo.repository'
import { ServerError, UncatchedError } from '../../errors/errors'
export const validateUserExists = async (user: CustomType): Promise<void> => {
  try {
    const airtable = await base('Web - UsersInfo').select({ view: 'WebView' }).all()
    const fields = airtable.map(result => result.fields)
    fields.forEach(record => { if (record.Email === user.email) throw new ServerError('This email is already registered', 'El email ya esta registrado', 409) })
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    throw new UncatchedError(error.message, 'validating existence on airtable', 'validar existencia de usuario en airtable')
  }
}
