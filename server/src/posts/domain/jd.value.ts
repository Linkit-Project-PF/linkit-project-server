import { randomUUID } from 'crypto'
import { type JdEntity } from './jd.entity'

export class JdValue implements JdEntity {
  id: string
  airTableId: string//! Preguntar a la empresa
  title: string
  description: string
  createdDate: string | null//! Verificar tipo de dato
  image?: string | null
  requisites: string[] | undefined//! Verificar tipo de dato
  modality?: string | null
  location?: string | null
  stack?: string[] | undefined
  schedule?: string | null//! Verificar tipo de dato
  archived?: boolean | null

  constructor (jd: JdEntity) {
    this.id = randomUUID()
    this.airTableId = jd.airTableId ?? undefined//! Si se va a implementar debe ser obigatorio
    this.title = jd.title
    this.description = jd.description
    this.createdDate = jd.createdDate
    this.image = jd.image ?? undefined
    this.requisites = jd.requisites ?? []
    this.modality = jd.modality ?? undefined
    this.location = jd.location ?? undefined
    this.stack = jd.stack ?? undefined
    this.schedule = jd.schedule ?? undefined
    this.archived = jd.archived ?? false
  }
}
