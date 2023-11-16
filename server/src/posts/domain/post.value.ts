import { randomUUID } from 'crypto'
import { type PostEntity } from './post.entity'

export class PostValue implements PostEntity {
  id: string
  airTableId: string//! Preguntar a la empresa
  title: string
  description: string
  createdDate: string | null//! Verificar tipo de dato
  image?: string | null
  link?: string | null
  input: string
  type?: string | null//! Revisar a qué se refiere este campo
  archived?: boolean | null

  constructor (post: PostEntity) {
    this.id = randomUUID()
    this.airTableId = post.airTableId ?? undefined //! Si se va a implementar debe ser obigatorio
    this.title = post.title
    this.description = post.description
    this.createdDate = post.createdDate
    this.image = post.image ?? undefined
    this.link = post.link ?? undefined
    this.input = post.input
    this.type = post.type ?? undefined//! Revisar a qué se refiere este campo
    this.archived = post.archived ?? false
  }
}
