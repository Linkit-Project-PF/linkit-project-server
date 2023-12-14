import { type RequestHandler } from 'express'
import { type PostulationUseCase } from '../../aplication/postulationUseCase'
import adminAuth from '../../../users/infrastructure/helpers/admin/adminAuthHelper'

export class PostulationController {
  constructor (private readonly postulationUseCase: PostulationUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'find')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const postulations = await this.postulationUseCase.findPostulation()
      return res.status(200).json(postulations)
    } catch (error: any) {
      console.log(error)
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'create')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const postulation = await this.postulationUseCase.createPostulation(req.body)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
