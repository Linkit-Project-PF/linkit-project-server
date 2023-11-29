import { type PostEntity } from '../../domain/post/post.entity'
import { type PostRepository } from '../../domain/post/post.repository'
import { ValidatePostCreate } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import Post from '../schema/Post'
import mongoDBConnect from '../../../db/mongo'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'

export class MongoPostRepository implements PostRepository {
  async createPost (post: PostEntity): Promise<PostEntity> {
    try {
      ValidatePostCreate(post)
      let postExists = false
      const allTitles = await Post.find({}, 'title type')
      allTitles.forEach(obj => {
        if (obj.title === post.title && obj.type === post.type) postExists = true
      })
      if (!postExists) {
        const postCreated = await Post.create(post)
        return postCreated as PostEntity
      } else throw Error('Post title already exists')
    } catch (error: any) {
      throw new ValidationError(`Error creating post: ${(error as Error).message}`)
    }
  }

  async deletePost (id: string): Promise<string> {
    try {
      objectIDValidator(id, 'post to delete')
      await mongoDBConnect()
      await Post.findByIdAndUpdate(
        id,
        { archived: true }
      )
      return 'Post deleted'
    } catch (error) {
      throw new ValidationError(`Error deleting post: ${(error as Error).message}`)
    }
  }

  async findPost (value: string, filter: string): Promise<PostEntity | PostEntity[]> {
    try {
      let result
      const validFilters = ['title', 'type', 'archived', 'category']
      if (filter === 'all') result = await Post.find()
      else if (filter === 'id') result = await Post.findById(value)
      else if (validFilters.includes(filter)) result = await Post.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as PostEntity[]
    } catch (error) {
      throw new ValidationError(`Error searching post: ${(error as Error).message}`)
    }
  }

  async editPost (_id: string, post: any): Promise<PostEntity> {
    try {
      objectIDValidator(_id, 'post to edit')
      const invalidEdit = ['_id', 'createdDate']
      Object.keys(post).forEach(key => { if (invalidEdit.includes(key)) throw Error('ID/date cannot be changed') })
      const editedPost = await Post.findByIdAndUpdate(_id, post, { new: true })
      if (editedPost) return editedPost as PostEntity
      else throw Error('Post not found')
    } catch (error) {
      throw new ValidationError(`Error editing post: ${(error as Error).message}`)
    }
  }
}
