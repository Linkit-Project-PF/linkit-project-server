import { type PostEntity } from '../../domain/post.entity'
import { type PostRepository } from '../../domain/post.repository'
// import { BlogValue } from '../../domain/blog/blog.value'
import Post from '../models/Post'

export class MongoPostRepository implements PostRepository {
  async createPost (post: PostEntity): Promise<PostEntity | string> {
    try {
      let postExists = false
      const allTitles = await Post.find({}, 'title input')
      allTitles.forEach(obj => {
        if (obj.title === post.title && obj.input === post.input) postExists = true
      })
      if (!postExists) {
        const postCreated = await Post.create(post)
        return postCreated
      } else throw Error('Another post already exists with same Title from that type')
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

  async findPost (type: string, id?: string): Promise<PostEntity[] | string> { //* This needs to filter depending on post type
    try {
      let post
      if (type !== 'undefined') {
        const validTypes = ['jd', 'social', 'blog', 'ebook']
        if (!validTypes.includes(type)) throw Error('That is not a valid post type')
        post = await Post.find({ input: type })
      } else post = await Post.find()
      return post
    } catch (error: any) {
      return `Error ${error}`
    }
  }

  async editPost (id: string, post: PostEntity): Promise<PostEntity | null> { //* This needs to receive the post id? and the changes.
    try {
      const editedPost = await Post.findByIdAndUpdate(id, post)
      return editedPost
    } catch (error) {
      return null
    }
  }
}
