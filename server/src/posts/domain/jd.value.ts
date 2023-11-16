import { randomUUID } from 'crypto'
import { type JdEntity } from './jd.entity'

export class JdValue implements JdEntity {
  id: string
  airTableId?: string | null//! Preguntar a la empresa
  title: string
  description: string
  createdDate?: string | null//! Verificar tipo de dato
  image?: string | null
  requisites?: string | null//! Verificar tipo de dato
  modality?: string | null
  location?: string | null
  stack?: string | null
  schedule?: string | null//! Verificar tipo de dato
  archived?: boolean | null

  constructor (jd: JdEntity) {
    this.id = randomUUID()
    this.airTableId = jd.airTableId//! Si se va a implementar debe ser obigatorio
    this.title = jd.title
    this.description = jd.description
    this.createdDate = jd.createdDate
    this.image = jd.image
    this.requisites = jd.requisites
    this.modality = jd.modality
    this.location = jd.location
    this.stack = jd.stack
    this.schedule = jd.schedule
    this.archived = jd.archived ?? false
  }
}
