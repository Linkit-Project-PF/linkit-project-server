import { type RequestHandler } from 'express'
import { type PostUseCase } from '../../aplication/postUseCase'

export class PostController {
  constructor (private readonly postUseCase: PostUseCase) {}

  public getTypeController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.findPostByType(String(req.query.type))
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public getIdController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.findPostById(req.params.id)
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public getTitleController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.findPostByTitle(String(req.query.title))
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.createPost(req.body)
      if (typeof post === 'string') return res.status(409).json(post)
      return res.status(201).json(post)
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
      const { _id } = req.params
      const post = await this.postUseCase.deletePost(_id)
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
