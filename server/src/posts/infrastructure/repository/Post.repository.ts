import { type PostEntity } from '../../domain/post/post.entity'
import { type PostRepository } from '../../domain/post/post.repository'
import { ValidatePostCreate, ValidatePostDelete } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import Post from '../schema/Post'
import mongoDBConnect from '../../../db/mongo'

export class MongoPostRepository implements PostRepository {
  async createPost (post: PostEntity): Promise<PostEntity | string> {
    try {
      ValidatePostCreate(post)
      let postExists = false
      const allTitles = await Post.find({}, 'title type')
      allTitles.forEach(obj => {
        if (obj.title === post.title && obj.type === post.type) postExists = true
      })
      if (!postExists) {
        const postCreated = await Post.create(post)
        return postCreated as unknown as PostEntity
      } else throw Error('Ya existe otro post de este tipo con este título')
    } catch (error: any) {
      throw new ValidationError(`Error al crear el post: ${(error as Error).message}`)
    }
  }

  async deletePost (id: string): Promise<string> {
    try {
      ValidatePostDelete(id)
      await mongoDBConnect()
      await Post.updateOne(
        { id },
        { $set: { archived: true } }
      )
      return 'Post archivado'
    } catch (error) {
      console.error(error)
      return 'Error al intentar archivar el posteo'
    }
  }

  async findPost (value: string, filter: string): Promise<PostEntity | PostEntity[] | string> {
    try {
      let result
      const validFilters = ['title', 'type', 'archived', 'category']
      if (filter === 'all') result = await Post.find()
      else if (filter === 'id') result = await Post.findById(value)
      else if (validFilters.includes(filter)) result = await Post.find({ [filter]: value })
      else throw Error('Not a valid parameter')
      return result as unknown as PostEntity[]
    } catch (error) {
      throw new ValidationError(`Error al buscar el post: ${(error as Error).message}`)
    }
  }

  async editPost (_id: string, post: PostEntity): Promise<PostEntity | string> {
    try {
      const editedPost = await Post.findByIdAndUpdate(_id, post)
      return editedPost as unknown as PostEntity
    } catch (error) {
      throw new ValidationError(`Error al editar el post: ${(error as Error).message}`)
    }
  }
}
