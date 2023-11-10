import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findPostById: (uuid: string) => Promise<PostEntity | null>
  deletePost: (uuid: string) => Promise<boolean | null>
  editPost: (post: PostEntity) => Promise<PostEntity | null>
}
