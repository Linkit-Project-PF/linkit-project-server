import { type CompanyEntity } from './company.entity'

export interface CompanyRepository {
  findCompany: (value: string, filter: string) => Promise<CompanyEntity | CompanyEntity[]>
  createCompany: (company: CompanyEntity) => Promise <CompanyEntity>
  deleteCompany: (id: string, reqID?: string, total?: string) => Promise<CompanyEntity[]>
  editCompany: (id: string, company: CompanyEntity) => Promise<CompanyEntity>
}
