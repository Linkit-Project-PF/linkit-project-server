import { type CompanyEntity } from './company.entity'

export interface CompanyRepository {
  findCompany: (value: string, filter: string) => Promise<CompanyEntity | CompanyEntity[] | string>
  createCompany: (company: CompanyEntity) => Promise <CompanyEntity | string>
  deleteCompany: (id: string) => Promise<CompanyEntity | string>
  editCompany: (id: string, company: CompanyEntity) => Promise<CompanyEntity | string>
}
