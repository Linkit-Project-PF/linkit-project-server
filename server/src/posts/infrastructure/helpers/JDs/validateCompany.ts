import { ServerError } from '../../../../errors/errors'
import Company from '../../../../users/infrastructure/schema/Company'

export default async function validateCompany (name: string): Promise<void> {
  if (!name) throw new ServerError('Company name is needed to create a JD', 'El nombre de la empresa asociada es necesario para crear una vacante', 406)
  let exists = false
  const companies = await Company.find({}, 'companyName')
  companies.forEach(comp => { if (comp.companyName === name) exists = true })
  if (!exists) throw new ServerError('Company name does not exist', 'El nombre de la empresa no se encuentra en el registro', 404)
}
