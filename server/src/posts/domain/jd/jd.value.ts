import { randomUUID } from 'crypto'
import { type JdEntity } from './jd.entity'

export class JdValue implements JdEntity {
  id: string
  airTableId?: string | null//! Preguntar a la empresa
  title: string
  description: string
  createdDate: Date
  image?: string | null
  requisites: string[] | string
  modality: string
  location: string
  stack: string[] | string
  schedule: string
  archived?: boolean | null

  constructor (jd: JdEntity) {
    this.id = randomUUID()
    this.airTableId = jd.airTableId ?? undefined //! Si se va a implementar debe ser obigatorio
    this.title = jd.title
    this.description = jd.description
    this.createdDate = jd.createdDate
    this.image = jd.image ?? undefined
    this.requisites = jd.requisites
    this.modality = jd.modality
    this.location = jd.location
    this.stack = jd.stack
    this.schedule = jd.schedule
    this.archived = jd.archived ?? false
  }
}
