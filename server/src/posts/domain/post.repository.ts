import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findPost: (id: string, type: string, input: string, title: string, createdDate: string, link: string) => Promise<PostEntity | string>
  editPost: (_id: string, post: PostEntity) => Promise<PostEntity | null> //! _id de mongo
  deletePost: (id: string) => Promise<string | null>
}
