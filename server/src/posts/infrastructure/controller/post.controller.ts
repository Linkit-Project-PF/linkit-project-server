import { type RequestHandler } from 'express'
import { type PostUseCase } from '../../aplication/postUseCase'
import getPostValidator from '../helpers/Post/getPostValidator'
import postAuth from '../helpers/Post/postAuthHelper'

export class PostController {
  constructor (private readonly postUseCase: PostUseCase) {}

  public postController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postAuth((req as any).userId)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const post = await this.postUseCase.createPost(req.body)
      if (typeof post === 'string') return res.status(409).json(post)
      return res.status(201).json(post)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postAuth((req as any).userId)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const post = await getPostValidator(req.query, this.postUseCase)
      return res.status(200).json(post)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postAuth((req as any).userId)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const post = await this.postUseCase.editPost(req.params._id, req.body)
      return res.status(200).json(post)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postAuth((req as any).userId)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const { id } = req.params
      await this.postUseCase.deletePost(id, req.query.total as string)
      return res.status(200).json('Publicación eliminada')
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
