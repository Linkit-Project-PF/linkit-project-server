export interface usersPosted {
  user: string
  status: string
}

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
  archived: boolean
  company: string
  status: string
  users: usersPosted[]
  createdDate: Date
}
