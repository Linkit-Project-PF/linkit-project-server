import { type OKRsEntity } from './OKRs.entity'

export class OKRsValue implements OKRsEntity {
  OKRtitle: string
  specificOKRs: string[]
  archived: boolean

  constructor (OKR: OKRsEntity) {
    this.OKRtitle = OKR.OKRtitle
    this.specificOKRs = OKR.specificOKRs
    this.archived = OKR.archived
  }
}
