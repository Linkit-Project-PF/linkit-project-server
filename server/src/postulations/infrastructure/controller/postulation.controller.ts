import { type RequestHandler } from 'express'
import { type PostulationUseCase } from '../../aplication/postulationUseCase'
import getPostulationValidator from '../helpers/getPostulationValidator'
import postulationAuth from '../helpers/postulationAuth'

export class PostulationController {
  constructor (private readonly postulationUseCase: PostulationUseCase) { }

  public getController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postulationAuth((req as any).userId)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const postulations = await getPostulationValidator(req.query, this.postulationUseCase)
      return res.status(200).json(postulations)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postulationAuth((req as any).userId)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const postulation = await this.postulationUseCase.createPostulation(req.body)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public editController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postulationAuth((req as any).userId, req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const postulation = await this.postulationUseCase.updatePostulation(req.params.id, req.body)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await postulationAuth((req as any).userId, req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const postulation = await this.postulationUseCase.deletePostulation(req.params.id)
      return res.status(201).json(postulation)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
