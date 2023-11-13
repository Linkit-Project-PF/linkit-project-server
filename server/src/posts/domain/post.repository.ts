import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findPost: (type: string, id?: string) => Promise<PostEntity[] | string>
  deletePost: (_id: string) => Promise<any>
  editPost: (id: string, post: PostEntity) => Promise<PostEntity | null>
}
