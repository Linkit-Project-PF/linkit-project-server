import { type OKRsEntity } from './OKRs.entity'

export interface OKRsRepository {
  createOKR: (OKR: OKRsEntity) => Promise <OKRsEntity | string>
  findOKR: () => Promise <OKRsEntity | string[]>
  editOKR: (_id: string | string[], OKR: OKRsEntity) => Promise <OKRsEntity | string>
  deleteOKR: (_id: string) => Promise <string>
}
