import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findPost: (value: string, filter: string) => Promise<PostEntity | PostEntity[] | string>
  editPost: (_id: string, post: PostEntity) => Promise<PostEntity | string>//! _id de mongo
  deletePost: (id: string) => Promise<string>
}
