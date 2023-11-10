import { type PostEntity } from './post.entity'
import { type Types } from 'mongoose'

export class PostValue implements PostEntity {
  _id?: Types.ObjectId | null
  title: string
  image?: string | null
  description: string
  input: string
  constructor (post: PostEntity) {
    this._id = post._id ?? undefined
    this.title = post.title
    this.image = post.image ?? undefined
    this.description = post.description
    this.input = post.input
  }
}
