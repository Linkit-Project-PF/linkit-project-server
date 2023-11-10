import { type BlogEntity } from './post.entity'

export class BlogValue implements BlogEntity {
  id: string
  title: string
  image?: string
  description: string
  input: string
  constructor (blog: BlogEntity) {
    this.id = blog.id
    this.title = blog.title
    this.image = blog.image
    this.description = blog.description
    this.input = blog.input
  }
}
