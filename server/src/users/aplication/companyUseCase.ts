import { type CompanyEntity } from '../domain/company/company.entity'
import { type CompanyRepository } from '../domain/company/company.repository'
import { CompanyValue } from '../domain/company/company.value'

export class CompanyUseCase {
  constructor (private readonly companyRepository: CompanyRepository) {}

  public createCompany = async (company: CompanyEntity): Promise<CompanyEntity> => {
    const newCompany = new CompanyValue(company)
    const companyCreated = await this.companyRepository.createCompany(newCompany)
    return companyCreated
  }

  public findCompany = async (value: string, filter: string): Promise<CompanyEntity | CompanyEntity[]> => {
    const company = await this.companyRepository.findCompany(value, filter)
    return company
  }

  public editCompany = async (id: string, company: CompanyEntity): Promise<CompanyEntity> => {
    const editCompany = await this.companyRepository.editCompany(id, company)
    return editCompany
  }

  public deleteCompany = async (id: string, reqID?: string, total?: string): Promise<CompanyEntity | string> => {
    const deleteCompany = await this.companyRepository.deleteCompany(id, reqID, total)
    return deleteCompany
  }
}
