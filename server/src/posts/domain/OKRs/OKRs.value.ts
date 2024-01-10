import { type OKRsEntity, type Area } from './OKRs.entity'

export class OKRsValue implements OKRsEntity {
  generalTitleOKR: string
  areas: Area[]
  archived: boolean

  constructor (OKR: OKRsEntity) {
    this.generalTitleOKR = OKR.generalTitleOKR
    this.areas = OKR.areas
    this.archived = OKR.archived
  }
}
