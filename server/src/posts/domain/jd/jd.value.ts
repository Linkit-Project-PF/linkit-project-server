import { randomUUID } from 'crypto'
import { type JdEntity } from './jd.entity'

export class JdValue implements JdEntity {
  id: string
  airTableId?: string | null//! Preguntar a la empresa
  code: string
  title: string
  description: string
  image?: string | null
  type: string
  location: string
  modality: string
  stack: string[] | string
  aboutUs: string
  aboutClient: string
  responsabilities: string
  requirements: string[] | string
  niceToHave: string[] | string
  benefits: string[] | string
  archived?: boolean | null
  active: boolean
  company: string
  users?: string[] | string
  createdDate: Date

  constructor (jd: JdEntity) {
    this.id = randomUUID()
    this.airTableId = jd.airTableId ?? undefined //! Si se va a implementar debe ser obigatorio
    this.code = jd.code
    this.title = jd.title
    this.description = jd.description
    this.image = jd.image ?? undefined
    this.type = jd.type
    this.location = jd.location
    this.modality = jd.modality
    this.stack = jd.stack
    this.aboutUs = jd.aboutUs
    this.aboutClient = jd.aboutClient
    this.responsabilities = jd.responsabilities
    this.requirements = jd.requirements
    this.niceToHave = jd.niceToHave
    this.benefits = jd.benefits
    this.archived = jd.archived ?? undefined
    this.active = jd.active
    this.company = jd.company
    this.users = jd.users ?? undefined
    this.createdDate = jd.createdDate
  }
}
