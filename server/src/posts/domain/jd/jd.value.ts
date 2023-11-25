import { type JdEntity } from './jd.entity'

export class JdValue implements JdEntity {
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
  status: string
  users: string[]
  createdDate: Date

  constructor (jd: JdEntity) {
    this.airTableId = jd.airTableId ?? undefined
    this.code = jd.code
    this.title = jd.title
    this.description = jd.description
    this.type = jd.type
    this.location = jd.location
    this.modality = jd.modality
    this.stack = jd.stack
    this.aboutUs = jd.aboutUs
    this.aboutClient = jd.aboutClient ?? undefined
    this.responsabilities = jd.responsabilities
    this.requirements = jd.requirements
    this.niceToHave = jd.niceToHave
    this.benefits = jd.benefits
    this.archived = jd.archived
    this.company = jd.company
    this.status = jd.status
    this.users = jd.users
    this.createdDate = jd.createdDate
  }
}
