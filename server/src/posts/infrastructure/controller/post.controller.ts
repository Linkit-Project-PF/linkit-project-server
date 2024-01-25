import { type RequestHandler } from 'express'
import { type PostUseCase } from '../../aplication/postUseCase'
import getPostValidator from '../helpers/getPostValidator'
import { permValidator } from '../../../errors/validation'

export class PostController {
  constructor (private readonly postUseCase: PostUseCase) {}

  public postController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'create', 'posts')
      const post = await this.postUseCase.createPost(req.body)
      if (typeof post === 'string') return res.status(409).json(post)
      return res.status(201).json(post)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'get', 'posts')
      const post = await getPostValidator(req.query, this.postUseCase)
      return res.status(200).json(post)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'update', 'posts')
      const post = await this.postUseCase.editPost(req.params._id, req.body)
      return res.status(200).json(post)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'delete', 'posts')
      const { id } = req.params
      const result = await this.postUseCase.deletePost(id, req.query.total as string)
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
