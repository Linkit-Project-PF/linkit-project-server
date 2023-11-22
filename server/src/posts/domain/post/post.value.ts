import { type PostEntity } from './post.entity'

export class PostValue implements PostEntity {
  // airTableId?: string | null //! Preguntar a la empresa
  title: string
  description: string
  headers?: string[]
  createdDate: Date
  image?: string | null
  link?: string | null
  type: string
  archived?: boolean | null
  category?: string | null

  constructor (post: PostEntity) {
    // this.airTableId = post.airTableId ?? undefined //! Si se va a implementar debe ser obigatorio
    this.title = post.title
    this.description = post.description
    this.headers = post.headers ?? undefined
    this.createdDate = post.createdDate
    this.image = post.image ?? undefined
    this.link = post.link ?? undefined
    this.type = post.type
    this.archived = post.archived ?? false
    this.category = post.category ?? undefined
  }
}
