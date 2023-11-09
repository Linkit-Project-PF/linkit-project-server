import { type BlogEntity } from './blog.entity'

export interface BlogRepository {
  createBlog: (blog: BlogEntity) => Promise<BlogEntity | string>
  findBlogById: (uuid: string) => Promise<BlogEntity | string>
  deleteBlog: (uuid: string) => Promise<boolean | null>
  editBlog: (blog: BlogEntity) => Promise<BlogEntity | string>
}
