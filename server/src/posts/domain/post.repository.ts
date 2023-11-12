import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findPost: (type: string, id?: string) => Promise<PostEntity[] | string>
  deletePost: (id: string) => Promise<boolean | null>
  editPost: (id: string, post: PostEntity) => Promise<PostEntity | null>
}
