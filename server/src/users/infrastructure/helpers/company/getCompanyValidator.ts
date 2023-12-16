import { ServerError, UncatchedError } from '../../../../errors/errors'
import { type CompanyUseCase } from '../../../aplication/companyUseCase'
import { type CompanyEntity } from '../../../domain/company/company.entity'

interface CompanyQuery {
  id?: string
  name?: string
  email?: string
  active?: string
}

export default async function getCompanyValidator (query: CompanyQuery, userUseCase: CompanyUseCase): Promise<CompanyEntity | CompanyEntity[] | string> {
  try {
    let user
    if (Object.keys(query).length) {
      const filter: string = Object.keys(query)[0]
      const value: string = Object.values(query)[0]
      user = await userUseCase.findCompany(value, filter)
    } else {
      user = await userUseCase.findCompany('', 'all')
    }
    return user
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'searching company', 'buscar empresa')
  }
}
