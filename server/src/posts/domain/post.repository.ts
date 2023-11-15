import { type PostEntity } from './post.entity'

export interface PostRepository {
  createPost: (post: PostEntity) => Promise<PostEntity | string>
  findPostByType: (type: string) => Promise<PostEntity[] | string>
  findPostById: (id: string) => Promise<PostEntity | null>
  findPostByTitle: (title: string) => Promise<PostEntity | null>
  deletePost: (id: string) => Promise<any>
  editPost: (id: string, post: PostEntity) => Promise<PostEntity | null>
}
