import { type RequestHandler } from 'express'
import { type PostUseCase } from '../../aplication/postUseCase'

export class PostController {
  constructor (private readonly postUseCase: PostUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.postUseCase.findPost(String(req.query.type), String(req.query.id))
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.postUseCase.createPost(req.body)
      if (typeof blog === 'string') return res.status(409).json(blog)
      return res.status(201).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.postUseCase.editPost(req.body, String(req.query.type))
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.postUseCase.deletePost(req.body)
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
