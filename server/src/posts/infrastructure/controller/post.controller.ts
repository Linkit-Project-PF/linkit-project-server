import { type RequestHandler } from 'express'
import { type PostUseCase } from '../../aplication/postUseCase'

export class PostController {
  constructor (private readonly postUseCase: PostUseCase) {}

  public postPostController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.createPost(req.body)
      if (typeof post === 'string') return res.status(409).json(post)
      return res.status(201).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public getPostController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.findPost(String(req.query.id), String(req.query.type), String(req.query.input), String(req.query.title), String(req.query.createdDate), String(req.query.link))
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putPostController: RequestHandler = async (req, res) => {
    try {
      const post = await this.postUseCase.editPost(req.params._id, req.body)
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deletePostController: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params
      await this.postUseCase.deletePost(id)
      return res.status(200).json('Publicación eliminada')
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
