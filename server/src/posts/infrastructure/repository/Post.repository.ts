import { type BlogEntity } from '../../../posts/domain/post.entity'
import { type BlogRepository } from '../../../posts/domain/post.repository'
// import { BlogValue } from '../../domain/blog/blog.value'
import Blog from '../models/Blog'

export class MongoRepository implements BlogRepository {
  async createBlog (blog: BlogEntity): Promise<BlogEntity | string> {
    try {
      const blogCreated = await Blog.create(blog)
      return blogCreated
    } catch (error: any) {
      return `Error ${error}`
    }
  }

  async deleteBlog (uuid: string): Promise<boolean | null> {
    try {
      const blog = await Blog.findByIdAndDelete(uuid)
      return blog !== null
    } catch (error) {
      return null
    }
  }

  async findBlogById (uuid: string): Promise<BlogEntity | null> {
    try {
      const blog = await Blog.findById(uuid)
      return blog
    } catch (error) {
      return null
    }
  }

  async editBlog (blog: BlogEntity): Promise<BlogEntity | null> {
    try {
      const editedBlog = await Blog.findOneAndReplace(blog)
      return editedBlog
    } catch (error) {
      return null
    }
  }
}
