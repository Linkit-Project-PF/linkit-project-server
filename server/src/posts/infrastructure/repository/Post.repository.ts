import { type PostEntity } from '../../domain/post.entity'
import { type PostRepository } from '../../domain/post.repository'
import { ValidatePostCreate, ValidatePostUpdate, ValidatePostDelete, ValidatePostFindById, ValidatePostFindByType } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import Post from '../models/Post'
import mongoDBConnect from '../../../db/mongo'

export class MongoPostRepository implements PostRepository {
  async createPost (post: PostEntity): Promise<PostEntity | string> {
    try {
      ValidatePostCreate(post)
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
      throw new ValidationError(`Error al crear el post: ${(error as Error).message}`)
    }
  }

  async deletePost (_id: string): Promise<any> {
    try {
      ValidatePostDelete(_id)
      await mongoDBConnect()
      const resultado = await Post.updateOne(
        { _id },
        { $set: { archived: true } }
      )
      return resultado
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async findPostById (id: string): Promise<PostEntity | null> {
    try {
      ValidatePostFindById(id)
      const post = await Post.findById(id)
      return post
    } catch (error) {
      throw new ValidationError(`Error al buscar el post: ${(error as Error).message}`)
    }
  }

  async findPostByType (type: string): Promise<PostEntity[] | string> {
    try {
      ValidatePostFindByType(type)
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

  async editPost (id: string, post: PostEntity): Promise<PostEntity | null> {
    try {
      const editedPost = await Post.findByIdAndUpdate(id, post)
      ValidatePostUpdate(post)
      return editedPost
    } catch (error) {
      throw new ValidationError(`Error al editar el post: ${(error as Error).message}`)
    }
  }
}
