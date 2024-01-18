import { type blogHeader } from '../../../interfaces'
import { type PostEntity } from './post.entity'

export class PostValue implements PostEntity {
  title: string
  description: string
  headers: blogHeader[]
  createdDate: Date
  image?: string | null
  link?: string | null
  type: string
  archived: boolean | null
  category: string
  createdBy: string

  constructor (post: PostEntity) {
    this.title = post.title
    this.description = post.description
    this.headers = post.headers
    this.createdDate = post.createdDate
    this.image = post.image ?? undefined
    this.link = post.link ?? undefined
    this.type = post.type
    this.archived = post.archived ?? false
    this.category = post.category
    this.createdBy = post.createdBy
  }
}
