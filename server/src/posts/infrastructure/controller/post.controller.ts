import { type RequestHandler } from 'express'
import { type PostUseCase } from '../../aplication/postUseCase'
import getPostValidator from '../helpers/getPostValidator'

export class PostController {
  constructor (private readonly postUseCase: PostUseCase) {}

  public postController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.createPost(req.body)
      if (typeof post === 'string') return res.status(409).json(post)
      return res.status(201).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      const post = await getPostValidator(req.query, this.postUseCase)
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.editPost(req.params._id, req.body)
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params
      await this.postUseCase.deletePost(id)
      return res.status(200).json('Publicación eliminada')
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
