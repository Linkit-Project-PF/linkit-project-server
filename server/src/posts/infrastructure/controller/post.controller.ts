import { type RequestHandler } from 'express'
import { type BlogUseCase } from '../../aplication/postUseCase'

export class BlogControllers {
  constructor (private readonly blogUseCase: BlogUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.findBlogById(req.params.id)
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.createBlog(req.body)
      return res.status(201).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.editBlog(req.body)
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const blog = await this.blogUseCase.deleteBlog(req.body)
      return res.status(200).json(blog)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
