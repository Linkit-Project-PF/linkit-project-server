import { type PostEntity } from '../../domain/post.entity'
import { type PostRepository } from '../../domain/post.repository'
// import { BlogValue } from '../../domain/blog/blog.value'
import Post from '../models/Post'

export class MongoRepository implements PostRepository {
  async createPost (post: PostEntity): Promise<PostEntity | string> {
    try {
      const postCreated = await Post.create(post)
      return postCreated
    } catch (error: any) {
      return `Error ${error}`
    }
  }

  async deletePost (uuid: string): Promise<boolean | null> {
    try {
      const post = await Post.findByIdAndDelete(uuid)
      return post !== null
    } catch (error) {
      return null
    }
  }

  async findPostById (uuid: string): Promise<PostEntity | null> {
    try {
      const post = await Post.findById(uuid)
      return post
    } catch (error) {
      return null
    }
  }

  async editPost (post: PostEntity): Promise<PostEntity | null> {
    try {
      const editedPost = await Post.findOneAndReplace(post)
      return editedPost
    } catch (error) {
      return null
    }
  }
}
