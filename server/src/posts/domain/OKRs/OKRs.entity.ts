export interface SpecificOKRsArea {
  okrSpecificName: string
  okrsSpecific: string[]
}

export interface Area {
  name: string
  specificOKRsArea: SpecificOKRsArea[]
}

export interface OKRsEntity {
  generalTitleOKR: string
  areas: Area[]
  archived: boolean
}
