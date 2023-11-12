import { randomUUID } from 'crypto'
import { type PostEntity } from './post.entity'

export class PostValue implements PostEntity {
  _id: string
  title: string
  image?: string | null
  description: string
  input: string
  link?: string | null

  constructor (post: PostEntity) {
    this._id = randomUUID()
    this.title = post.title
    this.image = post.image ?? undefined
    this.description = post.description
    this.input = post.input
    this.link = post.link ?? undefined
  }
}
