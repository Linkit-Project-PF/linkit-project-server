import Company from '../../../../users/infrastructure/schema/Company'

export default async function validateCompany (name: string): Promise<void> {
  let exists = false
  const companies = await Company.find({}, 'companyName')
  companies.forEach(comp => { if (comp.companyName === name) exists = true })
  if (!exists) throw Error('Company does not exist, you can only create Jds for existing companies')
}
