import { type PostEntity } from '../../domain/post/post.entity'
import { type PostRepository } from '../../domain/post/post.repository'
import { ValidatePostCreate, ValidatePostUpdate, ValidatePostDelete, ValidatePostFindById } from '../../../errors/validation' //, ValidatePostFindByType, ValidatePostFindByTitle
import { ValidationError } from '../../../errors/errors'
import Post from '../collections/Post'
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

  async findPost (//! EL id es el de mongo
    id: string,
    type: string,
    input: string,
    title: string,
    createdDate: string,
    link: string): Promise<PostEntity | null> {
    try {
      ValidatePostFindById(id)
      const post = await Post.findById(id)
      return post
    } catch (error) {
      throw new ValidationError(`Error al buscar el post: ${(error as Error).message}`)
    }
  }

  // async findPostByTitle (title: string): Promise<PostEntity | null> {
  //   try {
  //     ValidatePostFindByTitle(title)
  //     const postFinded = await Post.findOne({ title: { $regex: new RegExp(title, 'i') } })
  //     return postFinded
  //   } catch (error) {
  //     throw new ValidationError(`Error al buscar el post: ${(error as Error).message}`)
  //   }
  // }

  // async findPostByType (type: string): Promise<PostEntity[] | string> {
  //   try {
  //     ValidatePostFindByType(type)
  //     let post
  //     if (type !== 'undefined') {
  //       const validTypes = ['jd', 'social', 'blog', 'ebook']
  //       if (!validTypes.includes(type)) throw Error('That is not a valid post type')
  //       post = await Post.find({ input: type })
  //     } else post = await Post.find()
  //     return post
  //   } catch (error: any) {
  //     return `Error ${error}`
  //   }
  // }

  async editPost (_id: string, post: PostEntity): Promise<PostEntity | null> {
    try {
      const editedPost = await Post.findByIdAndUpdate(_id, post)
      ValidatePostUpdate(post)
      return editedPost
    } catch (error) {
      throw new ValidationError(`Error al editar el post: ${(error as Error).message}`)
    }
  }
}
