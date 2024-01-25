import { type PostEntity } from '../../domain/post/post.entity'
import { type PostRepository } from '../../domain/post/post.repository'
import { validatePost } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'
import Post from '../schema/Post'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'

export class MongoPostRepository implements PostRepository {
  async createPost (post: PostEntity): Promise<PostEntity> {
    try {
      await validatePost(post)
      const postCreated = await Post.create(post)
      return postCreated as PostEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating post', 'crear publicacion')
    }
  }

  async findPost (value: string, filter: string): Promise<PostEntity | PostEntity[]> {
    try {
      let result
      const validFilters = ['title', 'type', 'archived', 'category']
      if (filter === 'all') result = await Post.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'searched post', 'publicacion buscada')
        result = await Post.findById(value)
        if (!result) throw new ServerError('No post found under that ID', 'No se encontro un post con ese ID', 404)
      } else if (validFilters.includes(filter)) result = await Post.find({ [filter]: value })
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
      const invalidEdit = ['_id', 'createdDate', 'createdBy']
      Object.keys(post).forEach(key => { if (invalidEdit.includes(key)) throw new ServerError('ID/date/createdBy cannot be changed', 'ID/fecha/autor no se pueden cambiar por esta ruta', 403) })
      const editedPost = await Post.findByIdAndUpdate(_id, post, { new: true })
      if (editedPost) return editedPost as PostEntity
      else throw new ServerError('Post not found', 'No se encontro la publicacion a editar', 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'edit post', 'editar publicacion')
    }
  }

  async deletePost (id: string, total?: string): Promise<PostEntity[]> {
    try {
      objectIDValidator(id, 'post to delete', 'publicacion a eliminar')
      const post = await Post.findById(id)
      if (!post) throw new ServerError('No post under that ID', 'No existe una publicacion con ese ID', 404)
      if (!total || total === 'false') {
        await Post.findByIdAndUpdate(
          id,
          { archived: !post.archived }
        )
      } else if (total === 'true') {
        await Post.findByIdAndDelete(id)
      }
      const allPosts = await Post.find()
      return allPosts // TODO FIX THIS TYPO
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting post', 'eliminar publicacion')
    }
  }
}
