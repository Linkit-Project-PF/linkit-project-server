import { type PostEntity } from './post.entity'

export class PostValue implements PostEntity {
  id: string
  title: string
  image?: string
  description: string
  input: string
  constructor (post: PostEntity) {
    this.id = post.id
    this.title = post.title
    this.image = post.image
    this.description = post.description
    this.input = post.input
  }
}
