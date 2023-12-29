import { type RequestHandler } from 'express'
import { type PostulationUseCase } from '../../aplication/postulationUseCase'
import { type translatedResponse } from '../../../interfaces'

export class PostulationController {
  constructor (private readonly postulationUseCase: PostulationUseCase) { }

  public getController: RequestHandler = async (req, res) => {
    try {
      const postulations = await this.postulationUseCase.findPostulation(req.query)
      return res.status(200).json(postulations)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const postulation = await this.postulationUseCase.createPostulation(req.body, req.query.user as string)
      return res.status(201).json(postulation[(req as any).lang as keyof translatedResponse])
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
