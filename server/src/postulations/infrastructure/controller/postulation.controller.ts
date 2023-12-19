import { type RequestHandler } from 'express'
import { type PostulationUseCase } from '../../aplication/postulationUseCase'

export class PostulationController {
  constructor (private readonly postulationUseCase: PostulationUseCase) { }

  // TODO Check response type here

  public getController: RequestHandler = async (req, res) => {
    try {
      const postulations = await this.postulationUseCase.findPostulation('', '') // TODO Change this here depending on filters
      return res.status(200).json(postulations)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const postulation = await this.postulationUseCase.createPostulation(req.body)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
