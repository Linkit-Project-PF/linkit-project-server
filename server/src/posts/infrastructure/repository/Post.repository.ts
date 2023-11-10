import { type PostEntity } from '../../domain/post.entity'
import { type PostRepository } from '../../domain/post.repository'
// import { BlogValue } from '../../domain/blog/blog.value'
import Post from '../models/Post'

export class MongoPostRepository implements PostRepository {
  async createPost (post: PostEntity): Promise<PostEntity | string> {
    try {
      const postCreated = await Post.create(post)
      return postCreated
    } catch (error: any) {
      return `Error ${error}`
    }
  }

  async deletePost (id: string): Promise<boolean | null> {
    try {
      const post = await Post.findByIdAndDelete(id)
      return post !== null
    } catch (error) {
      return null
    }
  }

  async findAllPosts (id: string): Promise<PostEntity[] | null> { //* This needs to filter depending on post type
    try {
      const post = await Post.find()
      return post
    } catch (error) {
      return null
    }
  }

  async editPost (post: PostEntity): Promise<PostEntity | null> { //* This needs to receive the post id? and the changes.
    try {
      const editedPost = await Post.findOneAndReplace(post)
      return editedPost
    } catch (error) {
      return null
    }
  }
}
