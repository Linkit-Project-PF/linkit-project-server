import { type RequestHandler } from 'express'
import { type PostUseCase } from '../../aplication/postUseCase'

export class BlogControllers {
  constructor (private readonly blogUseCase: PostUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.findPostById(req.params.id)
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.createPost(req.body)
      return res.status(201).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.editPost(req.body)
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.deletePost(req.body)
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
