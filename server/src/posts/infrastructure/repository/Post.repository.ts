import { type PostEntity } from '../../domain/post/post.entity'
import { type PostRepository } from '../../domain/post/post.repository'
import { ValidatePostCreate } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
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
      } else throw new ServerError('Post title already exists', 'El titulo de esta publicacion ya existe', 409)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating post', 'crear publicacion')
    }
  }

  async deletePost (id: string): Promise<string> {
    try {
      objectIDValidator(id, 'post to delete', 'publicacion a eliminar')
      await mongoDBConnect()
      const result = await Post.findByIdAndUpdate(
        id,
        { archived: true }
      )
      if (!result) throw new ServerError('No post under that ID', 'No existe una publicacion con ese ID', 404)
      return 'Post deleted'
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting post', 'eliminar publicacion')
    }
  }

  async findPost (value: string, filter: string): Promise<PostEntity | PostEntity[]> {
    try {
      let result
      const validFilters = ['title', 'type', 'archived', 'category']
      if (filter === 'all') result = await Post.find()
      else if (filter === 'id') result = await Post.findById(value)
      else if (validFilters.includes(filter)) result = await Post.find({ [filter]: value })
      else throw new ServerError('Not a valid parameter', 'Parametro invalido', 406)
      return result as PostEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching post', 'buscar publicacion')
    }
  }

  async editPost (_id: string, post: any): Promise<PostEntity> {
    try {
      objectIDValidator(_id, 'post to edit', 'publicacion a editar')
      const invalidEdit = ['_id', 'createdDate']
      Object.keys(post).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('ID/date cannot be changed', 'ID/fecha no se pueden cambiar por esta ruta', 403) })
      const editedPost = await Post.findByIdAndUpdate(_id, post, { new: true })
      if (editedPost) return editedPost as PostEntity
      else throw new ServerError('Post not found', 'No se encontro la publicacion a editar', 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'edit post', 'editar publicacion')
    }
  }
}
