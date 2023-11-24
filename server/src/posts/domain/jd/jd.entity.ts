export interface JdEntity {
  airTableId?: string | null
  code: string
  title: string
  description: string
  type: string
  location: string
  modality: string
  stack: string[]
  aboutUs: string
  aboutClient?: string | null
  responsabilities: string
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
  archived: boolean
  company: string
  users: string[]
  createdDate: Date
}
