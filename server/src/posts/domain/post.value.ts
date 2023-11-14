import { randomUUID } from 'crypto'
import { type PostEntity } from './post.entity'

export class PostValue implements PostEntity {
  id: string
  title: string
  image?: string | null
  description: string
  link?: string | null
  input: string
  modality?: string | null
  type?: string | null
  stack?: string[] | null
  location?: string | null
  archived?: boolean | null

  constructor (post: PostEntity) {
    this.id = randomUUID()
    this.title = post.title
    this.image = post.image ?? undefined
    this.description = post.description
    this.link = post.link ?? undefined
    this.input = post.input
    this.modality = post.modality ?? undefined
    this.type = post.type ?? undefined
    this.stack = post.stack ?? undefined
    this.location = post.location ?? undefined
    this.archived = post.archived ?? false
  }
}
