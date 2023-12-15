export interface JdEntity {
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
  recruiter: string
  archived: boolean
  company: string
  status: string
  users: string[]
  createdDate: Date
}
