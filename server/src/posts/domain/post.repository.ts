import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findAllPosts: (id: string) => Promise<PostEntity[] | null>
  deletePost: (id: string) => Promise<boolean | null>
  editPost: (post: PostEntity) => Promise<PostEntity | null>
}
