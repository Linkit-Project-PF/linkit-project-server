import { type RequestHandler } from 'express'
import { type PostulationUseCase } from '../../aplication/postulationUseCase'
import getPostulationValidator from '../helpers/getPostulationValidator'
import { permValidator } from '../../../errors/validation'

export class PostulationController {
  constructor (private readonly postulationUseCase: PostulationUseCase) { }

  public getController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'get', 'postulations')
      const postulations = await getPostulationValidator(req.query, this.postulationUseCase)
      return res.status(200).json(postulations)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'create', 'postulations')
      const postulation = await this.postulationUseCase.createPostulation(req.body)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public editController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'update', 'postulations')
      const postulation = await this.postulationUseCase.updatePostulation(req.params.id, req.body)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'delete', 'postulations')
      const postulation = await this.postulationUseCase.deletePostulation(req.params.id, req.query.total as string)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
