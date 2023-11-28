export interface JdEntity {
  // airTableId?: string | null
  code: string
  title: string
  description: string
  type: string
  location: string
  modality: string
  stack: string[]
  aboutUs?: string | null
  aboutClient?: string | null
  responsabilities?: string | null
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
  archived: boolean
  company: string
  status: string
  users: string[]
  createdDate: Date
}
