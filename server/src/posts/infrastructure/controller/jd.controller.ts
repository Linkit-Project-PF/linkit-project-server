import { type RequestHandler } from 'express'
import { type JdUseCase } from '../../aplication/jdUseCase'
import getJDValidator from '../helpers/getJDValidator'
import { permValidator } from '../../../errors/validation'

export class JdController {
  constructor (private readonly jdUseCase: JdUseCase) {}

  public postController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'create', 'jds')
      const jd = await this.jdUseCase.createJD(req.body)
      return res.status(201).json(jd)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'get', 'jds')
      const post = await getJDValidator(req.query, this.jdUseCase)
      return res.status(200).json(post)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'update', 'jds')
      const editedJd = await this.jdUseCase.editJD(req.params._id, req.body)
      return res.status(200).json(editedJd)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'delete', 'jds')
      const { id } = req.params
      const result = await this.jdUseCase.deleteJD(id, (req as any).userId, req.query.total as string)
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
