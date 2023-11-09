import { type BlogEntity } from '../domain/blog/blog.entity'
import { type BlogRepository } from '../domain/blog/blog.repository'
import { BlogValue } from '../domain/blog/blog.value'

export class BlogUseCase {
  constructor (private readonly blogRepository: BlogRepository) {}

  public createBlog = async (
    blog: BlogEntity
  ): Promise<BlogEntity | string> => {
    const newBlog = new BlogValue(blog)
    const blogCreated = await this.blogRepository.createBlog(newBlog)
    return blogCreated
  }

  public findBlogById = async (uuid: string): Promise<BlogEntity | null> => {
    const blog = await this.blogRepository.findBlogById(uuid)
    return blog
  }

  public deleteBlog = async (uuid: string): Promise<boolean | null> => {
    const blog = await this.blogRepository.deleteBlog(uuid)
    return blog
  }

  public editBlog = async (blog: BlogEntity): Promise<BlogEntity | null> => {
    const editBlog = await this.blogRepository.editBlog(blog)
    return editBlog
  }
}
