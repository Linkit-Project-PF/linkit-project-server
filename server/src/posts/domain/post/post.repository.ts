import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findPost: (value: string, filter: string) => Promise<PostEntity | PostEntity[] | string>
  editPost: (id: string, post: PostEntity) => Promise<PostEntity | string>
  deletePost: (id: string, total?: string) => Promise<PostEntity[]>
}
