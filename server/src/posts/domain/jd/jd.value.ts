import { type JdEntity } from './jd.entity'

export class JdValue implements JdEntity {
  // airTableId?: string | null //! Preguntar a la empresa
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
  archieved: boolean
  company: string
  users: string[]
  createdDate: Date

  constructor (jd: JdEntity) {
    // this.airTableId = jd.airTableId ?? undefined //! Si se va a implementar debe ser obigatorio
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
    this.archieved = jd.archieved
    this.company = jd.company
    this.users = jd.users
    this.createdDate = jd.createdDate
  }
}
